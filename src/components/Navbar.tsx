
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-1 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="absolute inset-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <h1 className="text-xl font-bold text-gradient">Space Events Kenya</h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/events" className="text-foreground/80 hover:text-foreground transition-colors">
            All Events
          </Link>
          <Link to="/organizers" className="text-foreground/80 hover:text-foreground transition-colors">
            Organizers
          </Link>
          <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Organizer Portal
          </Link>
        </div>

        <Button
          size="sm"
          className="hidden md:flex gap-2"
          onClick={() => window.dispatchEvent(new CustomEvent("open-registration-modal"))}
        >
          Add Your Event
        </Button>

        <button
          className="md:hidden text-foreground p-2"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary p-4">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link
              to="/"
              className="text-foreground block px-3 py-2 rounded-md hover:bg-secondary/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-foreground block px-3 py-2 rounded-md hover:bg-secondary/50"
              onClick={() => setIsMenuOpen(false)}
            >
              All Events
            </Link>
            <Link
              to="/organizers"
              className="text-foreground block px-3 py-2 rounded-md hover:bg-secondary/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Organizers
            </Link>
            <Link
              to="/dashboard"
              className="text-foreground block px-3 py-2 rounded-md hover:bg-secondary/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Organizer Portal
            </Link>
            <Button 
              className="w-full"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-registration-modal"));
                setIsMenuOpen(false);
              }}
            >
              Add Your Event
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
