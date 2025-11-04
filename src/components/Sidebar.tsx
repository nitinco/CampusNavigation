import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Location } from '@/types/location';
import { cn } from '@/lib/utils';

interface SidebarProps {
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
  onFindRoute: (location: Location) => void;
}

const CATEGORIES = ['All', 'Academic', 'Hostel', 'Sports', 'Facility', 'Administrative', 'Other'];

const Sidebar = ({ locations, selectedLocation, onSelectLocation, onFindRoute }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || location.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [locations, searchQuery, selectedCategory]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Academic: 'bg-blue-500',
      Hostel: 'bg-green-500',
      Sports: 'bg-orange-500',
      Facility: 'bg-purple-500',
      Administrative: 'bg-red-500',
      Other: 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="w-full lg:w-96 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No locations found</p>
            </div>
          ) : (
            filteredLocations.map(location => (
              <div
                key={location.id}
                className={cn(
                  "p-4 rounded-lg border border-border bg-card hover:bg-accent/50 cursor-pointer transition-all",
                  selectedLocation?.id === location.id && "bg-accent border-primary"
                )}
                onClick={() => onSelectLocation(location)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{location.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", getCategoryColor(location.category))}
                  >
                    {location.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {location.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFindRoute(location);
                  }}
                >
                  <Navigation className="h-3 w-3" />
                  Get Directions
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
