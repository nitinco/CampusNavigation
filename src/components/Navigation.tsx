import { useState } from 'react';
import { Building2, Navigation as NavIcon, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Navi-Gator" className="h-8 w-8" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-primary">Navi-Gator</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">Campus Navigator</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/map"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-primary"
          >
            Map
          </NavLink>
          <NavLink
            to="/buildings"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-primary"
          >
            <Building2 className="h-4 w-4" />
            Buildings
          </NavLink>
          <NavLink
            to="/navigate"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-primary"
          >
            <NavIcon className="h-4 w-4" />
            Navigate
          </NavLink>
        </div>

        {/* Desktop Search Button */}
        <Button size="sm" className="gap-2 hidden md:flex">
          <Search className="h-4 w-4" />
          Search
        </Button>

        {/* Mobile Menu Button */}
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card/95 backdrop-blur">
          <div className="container px-4 py-3 flex flex-col gap-2">
            <NavLink
              to="/map"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Map
            </NavLink>
            <NavLink
              to="/buildings"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building2 className="h-4 w-4" />
              Buildings
            </NavLink>
            <NavLink
              to="/navigate"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <NavIcon className="h-4 w-4" />
              Navigate
            </NavLink>
            <Button variant="ghost" size="sm" className="gap-2 w-full justify-start">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
