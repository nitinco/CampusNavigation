import { useEffect, useRef } from 'react';
import L, {
  Map as LeafletMap,
  Marker as LeafletMarker,
  Polyline as LeafletPolyline,
  LayerGroup,
  GeoJSON as LeafletGeoJSON,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location, RTU_CENTER } from '@/types/location';
import campusGeoJSON from '../map.geojson'; // ✅ Import your GeoJSON file

interface MapViewProps {
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
  routePath: [number, number][] | null;
  userLocation: [number, number] | null;
}

const MapView = ({
  locations,
  selectedLocation,
  onSelectLocation,
  routePath,
  userLocation,
}: MapViewProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);
  const userMarkerRef = useRef<LeafletMarker | null>(null);
  const routeRef = useRef<LeafletPolyline | null>(null);
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);

  // 🗺️ Initialize map once
  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: RTU_CENTER,
        zoom: 16,
        zoomControl: true,
      });

      // Base map tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      // Add layer group for dynamic markers
      markersRef.current = L.layerGroup().addTo(mapRef.current);

      // 🟢 Add static GeoJSON overlay (RTU campus map)
      geoJsonRef.current = L.geoJSON(campusGeoJSON, {
        style: {
          color: '#2e7d32',
          weight: 2,
          fillOpacity: 0.25,
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties?.name) {
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
          }
        },
      }).addTo(mapRef.current);

      // Optionally fit map to the GeoJSON bounds
      const bounds = geoJsonRef.current.getBounds();
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // 📍 Update markers when locations change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    locations.forEach((loc) => {
      const marker = L.marker(loc.coordinates);
      marker.bindPopup(`
        <div style="min-width:200px">
          <h3 style="margin:0 0 4px;font-weight:700">${loc.name}</h3>
          <div style="color:#64748b;font-size:12px;margin-bottom:6px">${loc.category}</div>
          <div style="color:#475569;font-size:12px">${loc.description}</div>
        </div>
      `);
      marker.on('click', () => onSelectLocation(loc));
      marker.addTo(markersRef.current as LayerGroup);
    });
  }, [locations, onSelectLocation]);

  // 🎯 Center on selected location
  useEffect(() => {
    if (!mapRef.current || !selectedLocation) return;
    mapRef.current.setView(selectedLocation.coordinates, 17, { animate: true });
  }, [selectedLocation]);

  // 🧭 Update user location marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      userMarkerRef.current = L.marker(userLocation, {
        title: 'Your location',
      }).addTo(mapRef.current);
    }
  }, [userLocation]);

  // 🚗 Draw route path between user & destination
  useEffect(() => {
    if (!mapRef.current) return;

    if (routeRef.current) {
      routeRef.current.remove();
      routeRef.current = null;
    }

    if (routePath && routePath.length >= 2) {
      routeRef.current = L.polyline(routePath, {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10',
      }).addTo(mapRef.current);

      mapRef.current.fitBounds(routeRef.current.getBounds(), { padding: [24, 24] });
    }
  }, [routePath]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default MapView;
