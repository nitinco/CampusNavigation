import { useState, useEffect, useMemo } from "react";
import { buildings } from "@/data/buildings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation, MapPin, ArrowRight, Clock, Footprints, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { NavigationMap } from "@/components/NavigationMap";

const Navigate = () => {
  const location = useLocation();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [showDirections, setShowDirections] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [remainingDistance, setRemainingDistance] = useState(0);
  const [eta, setEta] = useState(0);

  useEffect(() => {
    if (location.state?.destinationId) {
      setTo(location.state.destinationId);
    }
  }, [location.state]);

  const getUserLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          };
          setUserLocation(coords);
          setFrom("current-location");
          setGettingLocation(false);
          console.log('Location obtained:', coords);
        },
        (error) => {
          console.error("Geolocation error:", error.code, error.message);
          let errorMsg = "Unable to get your location.";
          if (error.code === 1) {
            errorMsg = "Location permission denied. Please enable location in your browser settings.";
          } else if (error.code === 2) {
            errorMsg = "Location service unavailable. Please try again.";
          } else if (error.code === 3) {
            errorMsg = "Location request timed out. Please try again.";
          }
          alert(errorMsg);
          setGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please use a modern browser.");
      setGettingLocation(false);
    }
  };

  const filteredBuildings = useMemo(() => {
    if (!searchQuery) return buildings;
    const query = searchQuery.toLowerCase();
    return buildings.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.code.toLowerCase().includes(query) ||
        b.address.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const fromBuilding = buildings.find((b) => b.id === from);
  const toBuilding = buildings.find((b) => b.id === to);

  const handleLocationUpdate = (data: { lng: number; lat: number; speed: number; distance: number }) => {
    setCurrentSpeed(data.speed);
    setRemainingDistance(data.distance);
    if (data.speed > 0) {
      setEta(Math.ceil(data.distance / data.speed / 60)); // Convert to minutes
    }
  };

  const handleBuildingSelect = (buildingName: string, buildingCode: string) => {
    const building = buildings.find((b) => b.name === buildingName || b.code === buildingCode);
    if (building) {
      setTo(building.id);
    }
  };

  const calculateDistance = () => {
    let fromCoords, toCoords;
    
    if (from === "current-location" && userLocation) {
      fromCoords = userLocation;
    } else if (fromBuilding) {
      fromCoords = fromBuilding.coordinates;
    } else {
      return 0;
    }
    
    if (!toBuilding) return 0;
    toCoords = toBuilding.coordinates;
    
    // Haversine formula for accurate distance calculation
    const R = 6371e3; // Earth's radius in meters
    const φ1 = fromCoords.lat * Math.PI / 180;
    const φ2 = toCoords.lat * Math.PI / 180;
    const Δφ = (toCoords.lat - fromCoords.lat) * Math.PI / 180;
    const Δλ = (toCoords.lng - fromCoords.lng) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const calculateTime = () => {
    const distance = calculateDistance();
    return Math.ceil(distance / 80); // Walking speed ~80m/min
  };

  const handleGetDirections = () => {
    if (from && to) {
      setShowDirections(true);
    }
  };

  const getFromCoords = () => {
    if (from === "current-location" && userLocation) {
      return userLocation;
    } else if (fromBuilding) {
      return fromBuilding.coordinates;
    }
    return undefined;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Navi-Gator" className="h-10 w-10" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Navigation</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Get walking directions between campus locations
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {showDirections && toBuilding ? (
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-elevated border">
                <NavigationMap
                  fromCoords={getFromCoords()}
                  toCoords={toBuilding.coordinates}
                  trackUserLocation={from === "current-location"}
                  onLocationUpdate={handleLocationUpdate}
                  onBuildingSelect={handleBuildingSelect}
                />
                {from === "current-location" && showDirections && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">ETA: {eta} min</span>
                    <span className="text-xs opacity-80">({Math.round(remainingDistance)}m left)</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-muted flex items-center justify-center border">
                <div className="text-center p-4 md:p-8">
                  <Navigation className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-base md:text-lg font-semibold mb-2">Ready to Navigate</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Select your starting point and destination, then click "Get Directions" to see the route on the map
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Navigation className="h-5 w-5 text-primary" />
                  Route Planner
                </CardTitle>
                <CardDescription className="text-sm">Select your starting point and destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    Search Buildings
                  </label>
                  <Input
                    placeholder="Search by name, code, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex gap-2">
                    <Select value={from} onValueChange={setFrom}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select starting location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-location">
                          📍 Current Location
                        </SelectItem>
                        {filteredBuildings.map((building) => (
                          <SelectItem key={building.id} value={building.id}>
                            {building.code} - {building.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={getUserLocation}
                      disabled={gettingLocation}
                      title="Use my current location"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Select value={to} onValueChange={setTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredBuildings.map((building) => (
                        <SelectItem key={building.id} value={building.id}>
                          {building.code} - {building.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGetDirections}
                  disabled={!from || !to || from === to}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>

                {showDirections && (from === "current-location" || fromBuilding) && toBuilding && (
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base md:text-lg">Route Details</h3>
                      <Badge className="gap-1 text-xs">
                        <Footprints className="h-3 w-3" />
                        Walking
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <Card>
                        <CardContent className="pt-4 md:pt-6">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs font-medium">
                              {from === "current-location" && showDirections ? "Live ETA" : "Est. Time"}
                            </span>
                          </div>
                          <div className="text-xl md:text-2xl font-bold">
                            {from === "current-location" && showDirections && eta > 0 ? eta : calculateTime()} min
                          </div>
                          {from === "current-location" && showDirections && currentSpeed > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {(currentSpeed * 3.6).toFixed(1)} km/h
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-4 md:pt-6">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="text-xs font-medium">Distance</span>
                          </div>
                          <div className="text-xl md:text-2xl font-bold">
                            {from === "current-location" && showDirections && remainingDistance > 0
                              ? Math.round(remainingDistance)
                              : Math.round(calculateDistance())} m
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3 mt-4 md:mt-6">
                      <h4 className="font-medium text-sm md:text-base">Step-by-step directions:</h4>
                      <div className="space-y-2">
                        <div className="flex gap-2 md:gap-3 items-start">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium flex-shrink-0">
                            1
                          </div>
                          <div className="flex-1 pt-0.5 md:pt-1">
                            <p className="text-xs md:text-sm">Start at <strong>{from === "current-location" ? "Your Current Location" : fromBuilding?.name}</strong></p>
                            <p className="text-xs text-muted-foreground">
                              {from === "current-location" 
                                ? `${userLocation?.lat.toFixed(6)}, ${userLocation?.lng.toFixed(6)}`
                                : fromBuilding?.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 md:gap-3 items-start">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs md:text-sm font-medium flex-shrink-0">
                            2
                          </div>
                          <div className="flex-1 pt-0.5 md:pt-1">
                            <p className="text-xs md:text-sm">Walk along the main campus pathway</p>
                            <p className="text-xs text-muted-foreground">
                              Follow signs toward {toBuilding.type} buildings
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 md:gap-3 items-start">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs md:text-sm font-medium flex-shrink-0">
                            3
                          </div>
                          <div className="flex-1 pt-0.5 md:pt-1">
                            <p className="text-xs md:text-sm">Arrive at <strong>{toBuilding.name}</strong></p>
                            <p className="text-xs text-muted-foreground">{toBuilding.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block space-y-4">
            {fromBuilding && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Starting Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">{fromBuilding.name}</div>
                    <Badge variant="secondary" className="text-xs">{fromBuilding.code}</Badge>
                    <p className="text-xs text-muted-foreground">{fromBuilding.address}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {toBuilding && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">{toBuilding.name}</div>
                    <Badge variant="secondary" className="text-xs">{toBuilding.code}</Badge>
                    <p className="text-xs text-muted-foreground">{toBuilding.address}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Most buildings are within a 10-minute walk</p>
                <p>• Click buildings on map to select</p>
                <p>• Look for building codes on entrances</p>
                <p>• Covered walkways available in some areas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
