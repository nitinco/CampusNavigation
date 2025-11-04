import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Location } from '@/types/location';
import { toast } from 'sonner';

interface AdminPanelProps {
  locations: Location[];
  onAddLocation: (location: Omit<Location, 'id'>) => void;
  onDeleteLocation: (id: string) => void;
}

const AdminPanel = ({ locations, onAddLocation, onDeleteLocation }: AdminPanelProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Academic' as Location['category'],
    description: '',
    latitude: '',
    longitude: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.latitude || !formData.longitude) {
      toast.error('Please fill all fields');
      return;
    }

    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      toast.error('Invalid coordinates');
      return;
    }

    onAddLocation({
      name: formData.name,
      category: formData.category,
      description: formData.description,
      coordinates: [lat, lng]
    });

    setFormData({
      name: '',
      category: 'Academic',
      description: '',
      latitude: '',
      longitude: ''
    });

    toast.success('Location added successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Location
          </CardTitle>
          <CardDescription>
            Add a new location to the RTU campus map
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Engineering Block B"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Location['category'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Hostel">Hostel</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Facility">Facility</SelectItem>
                    <SelectItem value="Administrative">Administrative</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  placeholder="25.1860"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  placeholder="75.8055"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the location..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full gap-2">
              <Save className="h-4 w-4" />
              Add Location
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Locations ({locations.length})</CardTitle>
          <CardDescription>
            View and remove existing campus locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {locations.map(location => (
              <div
                key={location.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-sm">{location.name}</h4>
                  <p className="text-xs text-muted-foreground">{location.category}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDeleteLocation(location.id);
                    toast.success('Location deleted');
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
