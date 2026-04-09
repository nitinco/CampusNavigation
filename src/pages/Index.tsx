import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building2, Navigation, ArrowRight } from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";

const Index = () => {
  const logoUrl = assetUrl("logo.png");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={logoUrl} alt="Navi-Gator" className="h-16 w-16 drop-shadow-lg" />
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-primary">Navi-Gator</h1>
                  <p className="text-lg text-muted-foreground">Campus Navigator</p>
                </div>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Navigate your campus with confidence. Find buildings, get turn-by-turn directions, and discover all campus facilities with our interactive map.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/navigate" asChild>
                <Button size="lg" className="gap-2">
                  Start Navigation
                  <Navigation className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/" asChild>
                <Button size="lg" variant="outline" className="gap-2">
                  View Map
                  <MapPin className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">26+</p>
                <p className="text-sm text-muted-foreground">Campus Buildings</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">Real-time</p>
                <p className="text-sm text-muted-foreground">Location Tracking</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl"></div>
              <img src={logoUrl} alt="Navi-Gator" className="relative w-full drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to navigate your campus efficiently and discover campus facilities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Interactive Map</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explore the entire campus with our detailed interactive map. Click on any building to see detailed information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Navigation className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Navigation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get turn-by-turn directions with real-time location tracking. Find the shortest route to any campus location.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Building Info</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Browse all 26+ campus buildings with detailed information, facilities, and locations of all departments.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-12 text-center space-y-6">
          <h3 className="text-3xl font-bold">Ready to explore campus?</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start using Navi-Gator today to navigate your campus like a pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/navigate" asChild>
              <Button size="lg" className="gap-2">
                Get Directions Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/buildings" asChild>
              <Button size="lg" variant="outline">
                Explore All Buildings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="container px-4 py-12 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>Navigate with confidence. Explore with ease.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
