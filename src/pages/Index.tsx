import { useState, useEffect } from 'react';
import { Locate } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MapView from '@/components/MapView';
import AdminPanel from '@/components/AdminPanel';
import RouteInfo from '@/components/RouteInfo';
import { Button } from '@/components/ui/button';
import { Location, SAMPLE_LOCATIONS, Route } from '@/types/location';
import { toast } from 'sonner';

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [locations, setLocations] = useState<Location[]>(SAMPLE_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routePath, setRoutePath] = useState<[number, number][] | null>(null);
  const [routeInfo, setRouteInfo] = useState<Route | null>(null);

  useEffect(() => {
    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          toast.success('Location access granted');
        },
        () => {
          toast.info('Location access denied. Using default location.');
        }
      );
    }
  }, []);

  const handleAddLocation = (newLocation: Omit<Location, 'id'>) => {
    const location: Location = {
      ...newLocation,
      id: Date.now().toString()
    };
    setLocations([...locations, location]);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
    if (selectedLocation?.id === id) {
      setSelectedLocation(null);
    }
  };

  const handleFindRoute = (destination: Location) => {
    const start = userLocation || SAMPLE_LOCATIONS[1].coordinates; 
    const end = destination.coordinates;

    
    const path: [number, number][] = [start, end];
    
    
    const R = 6371; 
    const lat1 = start[0] * Math.PI / 180;
    const lat2 = end[0] * Math.PI / 180;
    const deltaLat = (end[0] - start[0]) * Math.PI / 180;
    const deltaLng = (end[1] - start[1]) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Assume average walking speed of 5 km/h
    const duration = Math.ceil((distance / 5) * 60);

    setRoutePath(path);
    setRouteInfo({ distance, duration, path });
    setSelectedLocation(destination);
    toast.success(`Route calculated to ${destination.name}`);
  };

  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          toast.success('Location updated');
        },
        () => {
          toast.error('Unable to access location');
        }
      );
    } else {
      toast.error('Geolocation not supported by your browser');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAdmin={isAdmin} onToggleAdmin={() => setIsAdmin(!isAdmin)} />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {!isAdmin ? (
          <>
            <Sidebar
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              onFindRoute={handleFindRoute}
            />
            <div className="flex-1 relative min-h-[480px]">
              <MapView
                locations={locations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                routePath={routePath}
                userLocation={userLocation}
              />
              
              {routeInfo && (
                <RouteInfo
                  route={routeInfo}
                  destination={selectedLocation?.name || ''}
                  onClose={() => {
                    setRouteInfo(null);
                    setRoutePath(null);
                  }}
                />
              )}

              <Button
                className="absolute bottom-6 right-6 z-[1000] shadow-lg gap-2"
                onClick={handleGetUserLocation}
              >
                <Locate className="h-4 w-4" />
                My Location
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-auto">
            <AdminPanel
              locations={locations}
              onAddLocation={handleAddLocation}
              onDeleteLocation={handleDeleteLocation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
