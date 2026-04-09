import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'lucide-react';
import { assetUrl } from '@/lib/assetUrl';

interface NavigationMapProps {
  fromCoords?: { lng: number; lat: number };
  toCoords?: { lng: number; lat: number };
  trackUserLocation?: boolean;
  onLocationUpdate?: (location: { lng: number; lat: number; speed: number; distance: number }) => void;
  onBuildingSelect?: (buildingName: string, buildingCode: string) => void;
}

export const NavigationMap = ({ fromCoords, toCoords, trackUserLocation = false, onLocationUpdate, onBuildingSelect }: NavigationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null);
  const lastPosition = useRef<{ lng: number; lat: number; timestamp: number } | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const MAP_STYLE_URL = 'https://demotiles.maplibre.org/style.json';

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE_URL,
      center: toCoords || fromCoords || [75.808, 25.143],
      zoom: 16,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add scale control
    map.current.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      }),
      'bottom-right'
    );

    map.current.on('load', async () => {
      if (!map.current) return;

      try {
          // Load GeoJSON data (use map.geojson)
          const response = await fetch(assetUrl('data/map.geojson'));
          const geojsonData = await response.json();

          // Add the GeoJSON source
          map.current.addSource('campus-data', {
            type: 'geojson',
            data: geojsonData
          });

        // Add layer for polygon areas (buildings)
        map.current.addLayer({
          id: 'campus-areas',
          type: 'fill',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'Polygon'],
          paint: {
            'fill-color': 'hsl(210, 100%, 45%)',
            'fill-opacity': 0.2,
            'fill-outline-color': 'hsl(210, 100%, 35%)'
          }
        });

        // Add layer for polygon borders
        map.current.addLayer({
          id: 'campus-areas-border',
          type: 'line',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'Polygon'],
          paint: {
            'line-color': 'hsl(210, 100%, 35%)',
            'line-width': 2
          }
        });

        // Add layer for routes (LineStrings) - lighter baseline
        map.current.addLayer({
          id: 'campus-routes',
          type: 'line',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'LineString'],
          paint: {
            'line-color': 'hsl(210, 10%, 70%)',
            'line-width': 3,
            'line-opacity': 0.5
          }
        });

        // Add layer for point features (markers)
        map.current.addLayer({
          id: 'campus-points',
          type: 'circle',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'Point'],
          paint: {
            // use marker-color property when present, otherwise fallback
            'circle-color': ['coalesce', ['get', 'marker-color'], '#ef4444'],
            'circle-radius': 6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1
          }
        });

        // Add a symbol layer for labels (works for Point and Polygon centroids)
        map.current.addLayer({
          id: 'campus-labels',
          type: 'symbol',
          source: 'campus-data',
          layout: {
            'text-field': ['to-string', ['coalesce', ['get', 'name'], ['get', 'properties.name'], '']],
            'text-size': 12,
            'text-offset': [0, 1.2],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#0f172a',
            'text-halo-color': 'rgba(255,255,255,0.85)',
            'text-halo-width': 1
          }
        });

        // Build routing graph from LineString features
        const graph: Record<string, Array<{ to: string; w: number }>> = {};
        const coordKey = (c: [number, number]) => `${c[0].toFixed(6)},${c[1].toFixed(6)}`;
        const haversine = (a: [number, number], b: [number, number]) => {
          const toRad = (v: number) => (v * Math.PI) / 180;
          const R = 6371000; // meters
          const dLat = toRad(b[1] - a[1]);
          const dLon = toRad(b[0] - a[0]);
          const lat1 = toRad(a[1]);
          const lat2 = toRad(b[1]);
          const va = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(va), Math.sqrt(1 - va));
          return R * c;
        };

        const addEdge = (a: [number, number], b: [number, number]) => {
          const ka = coordKey(a);
          const kb = coordKey(b);
          const w = haversine(a, b);
          graph[ka] = graph[ka] || [];
          graph[kb] = graph[kb] || [];
          graph[ka].push({ to: kb, w });
          graph[kb].push({ to: ka, w });
        };

        (geojsonData.features || []).forEach((f: any) => {
          if (f.geometry?.type === 'LineString') {
            const coords: [number, number][] = f.geometry.coordinates;
            for (let i = 0; i < coords.length - 1; i++) {
              addEdge(coords[i], coords[i + 1]);
            }
          }
        });

        const graphNodes = Object.keys(graph);
        const nearestNode = (pt: [number, number]) => {
          let best: string | null = null;
          let bestDist = Infinity;
          for (const k of graphNodes) {
            const [lng, lat] = k.split(',').map(Number) as [number, number];
            const d = haversine([lng, lat], pt);
            if (d < bestDist) {
              bestDist = d;
              best = k;
            }
          }
          return best;
        };

        const dijkstra = (startCoord: [number, number], endCoord: [number, number]) => {
          if (!graphNodes.length) return null;
          const start = nearestNode(startCoord);
          const goal = nearestNode(endCoord);
          if (!start || !goal) return null;

          const dist: Record<string, number> = {};
          const prev: Record<string, string | null> = {};
          const pq: Array<{ node: string; d: number }> = [];

          const push = (node: string, d: number) => {
            pq.push({ node, d });
            pq.sort((a, b) => a.d - b.d);
          };

          for (const n of graphNodes) {
            dist[n] = Infinity;
            prev[n] = null;
          }

          dist[start] = 0;
          push(start, 0);

          while (pq.length) {
            const { node } = pq.shift()!;
            if (node === goal) break;
            for (const edge of graph[node] || []) {
              const alt = dist[node] + edge.w;
              if (alt < dist[edge.to]) {
                dist[edge.to] = alt;
                prev[edge.to] = node;
                push(edge.to, alt);
              }
            }
          }

          if (!prev[goal]) return null;
          const path: [number, number][] = [];
          let u: string | null = goal;
          while (u) {
            const parts = u.split(',').map(Number) as [number, number];
            path.push(parts);
            u = prev[u];
          }
          path.reverse();
          return path;
        };

        // expose routing helpers on map
        (map.current as any)._routing = { graph, nearestNode, dijkstra };

        // Add click handler for buildings
        map.current.on('click', 'campus-areas', (e) => {
          if (e.features && e.features[0]) {
            const feature = e.features[0];
            const name = feature.properties?.name || 'Unknown Building';
            const code = feature.properties?.code || '';
            
            if (onBuildingSelect) {
              onBuildingSelect(name, code);
            }
            
            // Show popup
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<strong>${name}</strong><br/>${code}`)
              .addTo(map.current!);
          }
        });

        // Change cursor on hover
        map.current.on('mouseenter', 'campus-areas', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'campus-areas', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });

        setIsMapReady(true);
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    });
  };

  // Update route when coordinates change
  useEffect(() => {
    if (!map.current || !isMapReady || !fromCoords || !toCoords) return;

    const routing = (map.current as any)._routing;
    if (!routing) return;

    // compute path via graph
    const start: [number, number] = [fromCoords.lng, fromCoords.lat];
    const end: [number, number] = [toCoords.lng, toCoords.lat];
    const path = routing.dijkstra(start, end);

    // remove existing highlight if present
    if (map.current.getLayer('route-highlight')) map.current.removeLayer('route-highlight');
    if (map.current.getSource('route-highlight')) map.current.removeSource('route-highlight');

    if (!path) {
      // fallback to straight line
      const coords = [start, end];
      map.current.addSource('route-highlight', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: coords }
        }
      });
    } else {
      map.current.addSource('route-highlight', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: path }
        }
      });
    }

    map.current.addLayer({
      id: 'route-highlight',
      type: 'line',
      source: 'route-highlight',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': '#0ea5e9', 'line-width': 6, 'line-opacity': 0.95 }
    });

    // Add destination marker
    new mapboxgl.Marker({ color: '#ef4444' })
      .setLngLat([toCoords.lng, toCoords.lat])
      .addTo(map.current);

    // Fit map to show the route
    const bounds = new mapboxgl.LngLatBounds();
    const routeCoords: [number, number][] = path || [start, end];
    routeCoords.forEach((c) => bounds.extend(c as any));
    map.current.fitBounds(bounds, { padding: 100, maxZoom: 17 });
  }, [fromCoords, toCoords, isMapReady]);

  // Track user location in real-time
  useEffect(() => {
    if (!map.current || !isMapReady || !trackUserLocation) return;

    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log('Watch position update:', position.coords);
          const userPos: [number, number] = [
            position.coords.longitude,
            position.coords.latitude
          ];

          const currentTime = Date.now();

          // Calculate speed and distance
          if (toCoords && onLocationUpdate) {
            const R = 6371e3; // Earth's radius in meters
            const φ1 = position.coords.latitude * Math.PI / 180;
            const φ2 = toCoords.lat * Math.PI / 180;
            const Δφ = (toCoords.lat - position.coords.latitude) * Math.PI / 180;
            const Δλ = (toCoords.lng - position.coords.longitude) * Math.PI / 180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;

            // Calculate speed in m/s
            let speed = 1.4; // Default walking speed (1.4 m/s = ~5 km/h)
            if (lastPosition.current) {
              const timeDiff = (currentTime - lastPosition.current.timestamp) / 1000; // seconds
              const φ1Prev = lastPosition.current.lat * Math.PI / 180;
              const φ2Prev = position.coords.latitude * Math.PI / 180;
              const ΔφPrev = (position.coords.latitude - lastPosition.current.lat) * Math.PI / 180;
              const ΔλPrev = (position.coords.longitude - lastPosition.current.lng) * Math.PI / 180;

              const aPrev = Math.sin(ΔφPrev/2) * Math.sin(ΔφPrev/2) +
                            Math.cos(φ1Prev) * Math.cos(φ2Prev) *
                            Math.sin(ΔλPrev/2) * Math.sin(ΔλPrev/2);
              const cPrev = 2 * Math.atan2(Math.sqrt(aPrev), Math.sqrt(1-aPrev));
              const distanceMoved = R * cPrev;

              if (timeDiff > 0 && distanceMoved > 0) {
                speed = Math.max(distanceMoved / timeDiff, 0.5); // Minimum 0.5 m/s
              }
            }

            lastPosition.current = {
              lng: position.coords.longitude,
              lat: position.coords.latitude,
              timestamp: currentTime
            };

            onLocationUpdate({
              lng: position.coords.longitude,
              lat: position.coords.latitude,
              speed,
              distance
            });
          }

          // Create or update user location marker
          if (!userLocationMarker.current) {
            // Create custom blue dot marker
            const el = document.createElement('div');
            el.className = 'user-location-marker';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = '#3b82f6';
            el.style.border = '3px solid white';
            el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';

            userLocationMarker.current = new mapboxgl.Marker({ element: el })
              .setLngLat(userPos)
              .addTo(map.current!);
          } else {
            userLocationMarker.current.setLngLat(userPos);
          }

          // Update route if tracking from current location
          if (fromCoords && toCoords && map.current.getSource('route')) {
            (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [userPos, [toCoords.lng, toCoords.lat]]
              }
            });
          }
        },
        (error) => {
          console.error('Geolocation watch error:', error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      if (userLocationMarker.current) {
        userLocationMarker.current.remove();
        userLocationMarker.current = null;
      }
    };
  }, [isMapReady, trackUserLocation, fromCoords, toCoords]);

  useEffect(() => {
    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {trackUserLocation && (
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Live Tracking
        </div>
      )}
    </div>
  );
};
