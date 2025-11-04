import { GraduationCap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

const Header = ({ isAdmin, onToggleAdmin }: HeaderProps) => {
  const location = useLocation();
  const isDevPage = location.pathname === '/developers';

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <GraduationCap className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold">RTU Campus Navigator</h1>
            <p className="text-xs opacity-90">Rajasthan Technical University, Kota</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <Link to="/developers">
            <Button
              variant={isDevPage ? "accent" : "secondary"}
              size="sm"
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Team
            </Button>
          </Link>
          
          {!isDevPage && (
            <Button
              variant={isAdmin ? "accent" : "secondary"}
              size="sm"
              onClick={onToggleAdmin}
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              {isAdmin ? 'Admin Mode' : 'User Mode'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
