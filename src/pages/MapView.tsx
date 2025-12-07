import { useState } from "react";
import { MapboxMap } from "@/components/MapboxMap";
import { buildings } from "@/data/buildings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const MapView = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | undefined>();
  const navigate = useNavigate();
  
  const building = buildings.find((b) => b.id === selectedBuilding);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container px-4 py-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Navi-Gator" className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">Campus Map</h1>
              <p className="text-muted-foreground">
                Click on any building to view details or search for locations
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden" style={{ height: '600px' }}>
              <MapboxMap
                mode="map"
                onFeatureClick={(feature) => {
                  console.log('Feature clicked:', feature);
                }}
              />
            </div>
          </div>

          <div>
            {building ? (
              <Card className="sticky top-20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>{building.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{building.code}</Badge>
                          <span className="capitalize">{building.type}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedBuilding(undefined)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{building.description}</p>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
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

                  <Button
                    onClick={() => navigate('/navigate', { state: { destinationId: building.id } })}
                    className="w-full"
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Building</CardTitle>
                  <CardDescription>
                    Click on any building marker on the map to view its details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No building selected</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
