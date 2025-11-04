import { Users, Code, Database, Palette, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeamMember {
  name: string;
  role: string;
  work: string[];
  icon: typeof Code;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Nitin',
    role: 'Lead Developer',
    work: [
      'Interactive map implementation using Leaflet.js',
      'React component architecture and state management',
      'Route calculation and pathfinding algorithms',
      'Project coordination and code review'
    ],
    icon: Code,
    color: 'text-blue-500'
  },
  {
    name: 'Pranjal Porwal',
    role: 'Frontend Developer',
    work: [
      'UI/UX design and implementation',
      'Responsive sidebar with search and filters',
      'Admin panel for location management',
      'Accessibility and mobile optimization'
    ],
    icon: Palette,
    color: 'text-purple-500'
  },
  {
    name: 'Abhay Malav',
    role: 'Backend Developer',
    work: [
      'GeoJSON data structure and management',
      'Location and pathway data modeling',
      'Integration with geolocation APIs',
      'Performance optimization'
    ],
    icon: Database,
    color: 'text-green-500'
  },
  {
    name: 'Drishti Sharma',
    role: 'Full Stack Developer',
    work: [
      'Map marker customization and icons',
      'Real-time location tracking features',
      'Route display and navigation UI',
      'Testing and bug fixes'
    ],
    icon: Globe,
    color: 'text-orange-500'
  }
];

const Developers = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Development Team</h1>
          </div>
          <p className="text-sm opacity-90">
            Meet the talented individuals behind RTU Campus Navigator
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About the Project</CardTitle>
            <CardDescription>
              RTU Campus Navigator is a comprehensive web application developed for Rajasthan Technical University, Kota
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Leaflet.js</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Interactive campus mapping</li>
                  <li>• Smart search & filtering</li>
                  <li>• Route calculation</li>
                  <li>• Admin management</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Project Info</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>University:</strong> RTU Kota</p>
                  <p><strong>Type:</strong> Web Application</p>
                  <p><strong>Status:</strong> Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => {
              const Icon = member.icon;
              return (
                <Card key={member.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                        <CardDescription className="text-base">{member.role}</CardDescription>
                      </div>
                      <div className={`p-3 rounded-lg bg-accent ${member.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-3">Contributions:</h4>
                    <ul className="space-y-2">
                      {member.work.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technologies Used */}
        <Card>
          <CardHeader>
            <CardTitle>Technologies & Tools</CardTitle>
            <CardDescription>
              Modern web technologies used in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <Code className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h4 className="font-semibold text-sm">React.js</h4>
                <p className="text-xs text-muted-foreground">UI Framework</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Globe className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h4 className="font-semibold text-sm">Leaflet.js</h4>
                <p className="text-xs text-muted-foreground">Interactive Maps</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Database className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h4 className="font-semibold text-sm">GeoJSON</h4>
                <p className="text-xs text-muted-foreground">Data Format</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Palette className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <h4 className="font-semibold text-sm">Tailwind CSS</h4>
                <p className="text-xs text-muted-foreground">Styling</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Developers;
