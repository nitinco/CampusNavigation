import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Key } from 'lucide-react';
import { buildings } from '@/data/buildings';

interface MapboxMapProps {
  onFeatureClick?: (feature: any) => void;
}

interface MapboxMapPropsEx extends MapboxMapProps {
  mode?: 'map' | 'buildings' | 'navigate';
  typeFilter?: string; // used when mode='buildings'
}

export const MapboxMap = ({ onFeatureClick, mode = 'map', typeFilter = 'all' }: MapboxMapPropsEx) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [sourceCoord, setSourceCoord] = useState<[number, number] | null>(null);
  const [destCoord, setDestCoord] = useState<[number, number] | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(true);
  const [sourceBuildingId, setSourceBuildingId] = useState<string | undefined>();
  const [destBuildingId, setDestBuildingId] = useState<string | undefined>();
  // Load token from Vite env var `VITE_MAPBOX_TOKEN` or fallback to empty string.
  const DEFAULT_MAPBOX_TOKEN = (import.meta.env.VITE_MAPBOX_TOKEN as string) || '';
  const [mapboxToken] = useState<string>(DEFAULT_MAPBOX_TOKEN);
  const [isMapReady, setIsMapReady] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;
    

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [75.808, 25.143], // Center of the campus based on GeoJSON data
      zoom: 15.5,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control for user location
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showUserLocation: true
    });
    
    map.current.addControl(geolocateControl, 'top-right');

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
        // Load GeoJSON data
        const response = await fetch('/data/map.geojson');
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
            'fill-opacity': 0.3,
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

        // Add layer for routes (LineStrings)
        map.current.addLayer({
          id: 'campus-routes',
          type: 'line',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'LineString'],
          paint: {
            'line-color': 'hsl(142, 76%, 36%)',
            'line-width': 4,
            'line-opacity': 0.8
          }
        });

        // Add layer for route outlines
        map.current.addLayer({
          id: 'campus-routes-outline',
          type: 'line',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'LineString'],
          paint: {
            'line-color': 'hsl(142, 76%, 26%)',
            'line-width': 6,
            'line-opacity': 0.5,
            'line-gap-width': 0
          }
        });

        // Add layer for points (markers)
        map.current.addLayer({
          id: 'campus-markers',
          type: 'circle',
          source: 'campus-data',
          filter: ['==', ['geometry-type'], 'Point'],
          paint: {
            'circle-radius': 8,
            'circle-color': 'hsl(25, 95%, 53%)',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
          }
        });

        // Add labels for features
        map.current.addLayer({
          id: 'campus-labels',
          type: 'symbol',
          source: 'campus-data',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-offset': [0, 1.5],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': 'hsl(215, 25%, 15%)',
            'text-halo-color': '#fff',
            'text-halo-width': 2
          }
        });

        // Build a routing graph from LineString features
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
          let best = null as string | null;
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

        // expose routing helpers on map for debugging
        (map.current as any)._routing = { graph, nearestNode, dijkstra };

        // Helper to draw a computed route on the map
        const drawRoute = (path: [number, number][] | null) => {
          if (!map.current) return;
          // remove existing source/layers if present
          if (map.current.getLayer('routing-line')) {
            map.current.removeLayer('routing-line');
          }
          if (map.current.getLayer('routing-outline')) {
            map.current.removeLayer('routing-outline');
          }
          if (map.current.getSource('routing')) {
            map.current.removeSource('routing');
          }

          if (!path || !path.length) return;

          const data: any = {
            type: 'Feature' as const,
            geometry: {
              type: 'LineString',
              coordinates: path
            },
            properties: {}
          };

          map.current.addSource('routing', { type: 'geojson', data });
          map.current.addLayer({
            id: 'routing-outline',
            type: 'line',
            source: 'routing',
            paint: {
              'line-color': 'rgba(0,0,0,0.25)',
              'line-width': 8
            }
          });
          map.current.addLayer({
            id: 'routing-line',
            type: 'line',
            source: 'routing',
            paint: {
              'line-color': 'hsl(210, 100%, 50%)',
              'line-width': 4
            }
          });
        };

        // Expose drawRoute for controls outside
        (map.current as any)._drawRoute = drawRoute;

        // If we're in buildings mode, apply the initial filter
        if (mode === 'buildings') {
          const applyBuildingFilter = (type: string) => {
            if (!map.current) return;
            if (type === 'all') {
              // show all markers and areas
              map.current.setFilter('campus-markers', ['==', ['geometry-type'], 'Point']);
              map.current.setFilter('campus-areas', ['==', ['geometry-type'], 'Polygon']);
            } else {
              // compute names of buildings matching the type from src/data/buildings
              const names = buildings.filter(b => b.type === type).map(b => b.name);
              if (names.length === 0) {
                // no matches, hide
                map.current.setFilter('campus-markers', ['in', 'name', '']);
                map.current.setFilter('campus-areas', ['in', 'name', '']);
              } else {
                const filterExpr = ['in', ['get', 'name'], ['literal', names]] as any;
                // Some Mapbox versions don't accept nested literal, so fallback to ['in','name',...]
                const expr = ['in', ['get', 'name'], ['literal', names]];
                // we'll build a simple filter using 'match' for names
                map.current.setFilter('campus-markers', ['match', ['get', 'name'], ...names, true, false] as any);
                map.current.setFilter('campus-areas', ['match', ['get', 'name'], ...names, true, false] as any);
              }
            }
          };

          // apply current typeFilter prop
          applyBuildingFilter(typeFilter || 'all');

          // store helper for later updates
          (map.current as any)._applyBuildingFilter = applyBuildingFilter;
        }

        // Add click handlers (also set destination when clicking markers/areas)
        ['campus-areas', 'campus-routes', 'campus-markers'].forEach((layerId) => {
          map.current?.on('click', layerId, (e) => {
            if (e.features && e.features[0]) {
              const feature = e.features[0];
              onFeatureClick?.(feature);

              // Determine coordinates for popup and selection
              const coordinates =
                feature.geometry.type === 'Point'
                  ? (feature.geometry as any).coordinates.slice()
                  : (e.lngLat && [e.lngLat.lng, e.lngLat.lat]) || null;

              if (coordinates) {
                // Set destination coordinate in parent scope
                setDestCoord(coordinates as [number, number]);
              }

              // Try to map feature name to known building id
              const name = feature.properties?.name;
              if (name) {
                const found = buildings.find((b) => b.name.toLowerCase() === String(name).toLowerCase());
                if (found) {
                  setDestBuildingId(found.id);
                }
              }

              new mapboxgl.Popup()
                .setLngLat(coordinates as [number, number])
                .setHTML(`
                  <div style="padding: 8px;">
                    <h3 style="margin: 0 0 4px 0; font-weight: bold;">${feature.properties?.name || 'Campus Location'}</h3>
                    <p style="margin: 0; font-size: 12px; color: #666;">Click for more details</p>
                  </div>
                `)
                .addTo(map.current!);
            }
          });

          // Change cursor on hover
          map.current?.on('mouseenter', layerId, () => {
            if (map.current) map.current.getCanvas().style.cursor = 'pointer';
          });

          map.current?.on('mouseleave', layerId, () => {
            if (map.current) map.current.getCanvas().style.cursor = '';
          });
        });

        setIsMapReady(true);
      } catch (error) {
        console.error('Error loading GeoJSON data:', error);
      }
    });

    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
    });
  };

  // Token is read from env; no interactive save handler required.

  const computeRoute = async () => {
    if (!map.current) return;
    const routing = (map.current as any)._routing;
    const draw = (map.current as any)._drawRoute;
    if (!routing || !draw) return;

      const resolveSource = async (): Promise<[number, number] | null> => {
      if (useCurrentLocation) {
        return new Promise((res) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              res([pos.coords.longitude, pos.coords.latitude]);
            },
            () => res(null),
            { enableHighAccuracy: true, timeout: 5000 }
          );
        });
      }
      if (sourceBuildingId) {
        const b = buildings.find((bb) => bb.id === sourceBuildingId);
        if (b) return [b.coordinates.lng, b.coordinates.lat];
      }
      return sourceCoord;
    };

    const source = await resolveSource();
    const dest = destCoord || (destBuildingId ? (() => {
      const b = buildings.find((bb) => bb.id === destBuildingId);
      return b ? [b.coordinates.lng, b.coordinates.lat] : null;
    })() : null);

    if (!source || !dest) {
      console.warn('Source or destination not set for routing');
      return;
    }

    const path = routing.dijkstra(source, dest);
    if (!path) {
      console.warn('No path found');
      draw(null);
      return;
    }

    draw(path);
    // fit to route
    try {
      const bounds = path.reduce((b: any, coord: [number, number]) => b.extend(coord as any), new mapboxgl.LngLatBounds(path[0] as any, path[0] as any));
      map.current.fitBounds(bounds, { padding: 60 });
    } catch (e) {
      // ignore
    }
  };

  const clearRoute = () => {
    if (!map.current) return;
    if (map.current.getLayer('routing-line')) map.current.removeLayer('routing-line');
    if (map.current.getLayer('routing-outline')) map.current.removeLayer('routing-outline');
    if (map.current.getSource('routing')) map.current.removeSource('routing');
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    // No interactive prompt — show a simple message overlay. Token should be supplied
    // via `VITE_MAPBOX_TOKEN` for seamless UX.
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
        <div className="text-center text-sm text-muted-foreground">
          Mapbox token not configured. Set `VITE_MAPBOX_TOKEN` in your environment to enable the map.
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Only show the routing overlay if mode === 'navigate' */}
      {mode === 'navigate' && (
        <div className="absolute z-20 top-4 left-4 w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Route Planner</CardTitle>
              <CardDescription className="text-xs">Choose source and destination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-xs font-medium">Source</label>
                <div className="flex items-center gap-2">
                  <input id="useCurrent" type="checkbox" checked={useCurrentLocation} onChange={(e)=>setUseCurrentLocation(e.target.checked)} />
                  <label htmlFor="useCurrent" className="text-xs">Use current location</label>
                </div>

                {!useCurrentLocation && (
                  <div>
                    <label className="text-xs">Or choose source building</label>
                    <select className="w-full mt-1 text-sm" value={sourceBuildingId || ''} onChange={(e)=>setSourceBuildingId(e.target.value || undefined)}>
                      <option value="">Select building</option>
                      {buildings.map((b)=> (<option key={b.id} value={b.id}>{b.name}</option>))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-xs">Destination</label>
                  <select className="w-full mt-1 text-sm" value={destBuildingId || ''} onChange={(e)=>{
                    const id = e.target.value || undefined;
                    setDestBuildingId(id);
                    if (id) {
                      const b = buildings.find(bb=>bb.id===id);
                      if (b) setDestCoord([b.coordinates.lng, b.coordinates.lat]);
                    }
                  }}>
                    <option value="">Select destination</option>
                    {buildings.map((b)=> (<option key={b.id} value={b.id}>{b.name}</option>))}
                  </select>
                  <div className="text-xs text-muted-foreground mt-1">Or click a marker on the map to choose destination</div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={()=>computeRoute()} className="flex-1">Compute Route</Button>
                  <Button variant="ghost" onClick={()=>clearRoute()}>Clear</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <MapPin className="h-8 w-8 animate-pulse text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};
