
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpaceEvent } from "@/lib/types";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface EventCardProps {
  event: SpaceEvent;
  onViewDetails: (eventId: string) => void;
}

const EventCard = ({ event, onViewDetails }: EventCardProps) => {
  const { id, name, title, description, type, imageUrl, location, date, organizer } = event;

  const formattedDate = format(new Date(date), "MMM d, yyyy");
  
  // If description is too long, truncate it
  const truncatedDescription = description.length > 120
    ? `${description.substring(0, 120)}...`
    : description;

  const defaultImage = "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1000&auto=format&fit=crop";

  return (
    <Card className="h-full overflow-hidden hover:border-primary/50 transition-all duration-300 bg-card">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || defaultImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== defaultImage) {
              target.src = defaultImage;
            }
          }}
          loading="lazy"
        />
        <Badge 
          className="absolute top-2 right-2" 
          variant={type === "workshop" ? "default" : 
                 type === "seminar" ? "secondary" : 
                 type === "exhibition" ? "outline" : 
                 type === "competition" ? "destructive" : "default"}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <CardDescription>{formattedDate}</CardDescription>
        </div>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {truncatedDescription}
        </p>
        <div className="flex items-start gap-2 mt-4">
          <div 
            className="w-6 h-6 rounded-full overflow-hidden bg-primary/20 flex-shrink-0"
            style={{ backgroundImage: organizer?.logoUrl ? `url(${organizer.logoUrl})` : 'none', backgroundSize: 'cover' }}
          />
          <p className="text-xs text-foreground/70 line-clamp-1">
            {name || "Unknown Organizer"} • {location}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onViewDetails(id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
