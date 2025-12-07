import { Building } from "@/types/campus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuildingCardProps {
  building: Building;
  onNavigate?: (buildingId: string) => void;
  onViewOnMap?: (buildingId: string) => void;
}

const getTypeBadgeColor = (type: Building['type']) => {
  switch (type) {
    case 'academic':
      return 'bg-primary text-primary-foreground';
    case 'administrative':
      return 'bg-accent text-accent-foreground';
    case 'residence':
      return 'bg-secondary text-secondary-foreground';
    case 'recreation':
      return 'bg-purple-500 text-white';
    case 'dining':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const BuildingCard = ({ building, onNavigate, onViewOnMap }: BuildingCardProps) => {
  return (
    <Card className="hover:shadow-elevated transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{building.name}</CardTitle>
            </div>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary" className={getTypeBadgeColor(building.type)}>
                {building.code}
              </Badge>
              <span className="capitalize">{building.type}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{building.description}</p>
        
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span className="text-muted-foreground">{building.address}</span>
        </div>

        {building.facilities && building.facilities.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Facilities:</div>
            <div className="flex flex-wrap gap-1.5">
              {building.facilities.map((facility) => (
                <Badge key={facility} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onViewOnMap?.(building.id)}
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
          >
            <MapPin className="h-4 w-4" />
            View on Map
          </Button>
          <Button
            onClick={() => onNavigate?.(building.id)}
            size="sm"
            className="flex-1 gap-2"
          >
            <Navigation className="h-4 w-4" />
            Navigate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
