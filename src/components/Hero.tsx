
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search query
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-star">
      {/* Animated stars background */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full animate-twinkle`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Discover Space</span> Activities and Events in Kenya
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">Space Connect Kenya is a platform that lists space-related events, educational activities, and community programs across Kenya, including talks, workshops, exhibitions, and training opportunities.</p>
          
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Find space events near you..."
              className="pl-10 pr-24 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 bottom-1"
            >
              Search
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="border-primary/50 hover:border-primary"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              Browse Events
            </Button>
            <Button
              onClick={() => window.dispatchEvent(new CustomEvent("open-registration-modal"))}
            >
              Add Your Event
            </Button>
          </div>
        </div>
        
        <div className="mt-12 md:mt-20 flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="bg-card border border-primary/20 rounded-lg py-3 px-6 backdrop-blur-sm">
            <p className="text-3xl font-bold text-center text-primary">8+</p>
            <p className="text-xs text-center text-muted-foreground">Space Events</p>
          </div>
          <div className="bg-card border border-primary/20 rounded-lg py-3 px-6 backdrop-blur-sm">
            <p className="text-3xl font-bold text-center text-primary">5+</p>
            <p className="text-xs text-center text-muted-foreground">Organizations</p>
          </div>
          <div className="bg-card border border-primary/20 rounded-lg py-3 px-6 backdrop-blur-sm">
            <p className="text-3xl font-bold text-center text-primary">3+</p>
            <p className="text-xs text-center text-muted-foreground">Workshops</p>
          </div>
          <div className="bg-card border border-primary/20 rounded-lg py-3 px-6 backdrop-blur-sm">
            <p className="text-3xl font-bold text-center text-primary">2+</p>
            <p className="text-xs text-center text-muted-foreground">Competitions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
