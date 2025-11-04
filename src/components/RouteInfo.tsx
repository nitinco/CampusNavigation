import { Navigation, Clock, MapPin, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Route } from '@/types/location';

interface RouteInfoProps {
  route: Route | null;
  destination: string;
  onClose: () => void;
}

const RouteInfo = ({ route, destination, onClose }: RouteInfoProps) => {
  if (!route) return null;

  return (
    <Card className="absolute top-4 left-4 z-[1000] w-80 shadow-lg animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Route to {destination}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Distance:</span>
            <span className="font-semibold">{route.distance.toFixed(2)} km</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Walking time:</span>
            <span className="font-semibold">~{route.duration} min</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-accent/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Follow the blue dashed line on the map to reach your destination
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteInfo;
