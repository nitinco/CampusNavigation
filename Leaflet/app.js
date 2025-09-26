// Create map and set initial view
const map = L.map('map').setView([25.1383, 75.8076], 16); // Center of the campus

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data from external file
fetch('data.geojson')
  .then(response => response.json())
  .then(data => {
    // Add GeoJSON layer to map
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      },
      style: (feature) => {
        if (feature.geometry.type === "LineString") {
          return { color: "blue", weight: 4 };
        }
      },
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng);
      }
    }).addTo(map);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));

// Create "Locate Me" button
const locateBtn = L.control({ position: 'topleft' });

locateBtn.onAdd = function(map) {
  let div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
  div.innerHTML = '<button title="Locate Me">📍</button>';
  div.style.cursor = 'pointer';

  div.onclick = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("Current location:", lat, lng);

          L.marker([lat, lng]).addTo(map)
            .bindPopup("You are here")
            .openPopup();
          map.setView([lat, lng], 17);
        },
        function(error) {
          console.error("Geolocation error:", error);
          alert("Could not get your location. Check browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return div;
};

locateBtn.addTo(map);


  


