import { useState } from "react";
import { BuildingCard } from "@/components/BuildingCard";
import { buildings } from "@/data/buildings";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Buildings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredBuildings = buildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || building.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleNavigate = (buildingId: string) => {
    navigate('/navigate', { state: { destinationId: buildingId } });
  };

  const handleViewOnMap = (buildingId: string) => {
    navigate('/', { state: { selectedBuildingId: buildingId } });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container px-4 py-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Navi-Gator" className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">Campus Buildings</h1>
              <p className="text-muted-foreground">
                Browse all campus facilities and locations
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search buildings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="administrative">Administrative</SelectItem>
                <SelectItem value="residence">Residence</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="recreation">Recreation</SelectItem>
                <SelectItem value="dining">Dining</SelectItem>
                <SelectItem value="utility">Utility</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredBuildings.length} of {buildings.length} buildings
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              onNavigate={handleNavigate}
              onViewOnMap={handleViewOnMap}
            />
          ))}
        </div>

        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No buildings found matching your criteria</p>
            <Button onClick={() => { setSearchQuery(""); setTypeFilter("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buildings;
