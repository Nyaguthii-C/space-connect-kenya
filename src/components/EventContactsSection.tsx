
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { Contact, SpaceEvent } from "@/lib/types";
import { Send, ChevronDown, ChevronRight } from "lucide-react";

interface EventContactsSectionProps {
  events: SpaceEvent[];
  onSendIndividualMessage: (contact: Contact) => void;
  onSendBulkMessage: (contacts: Contact[], eventTitle: string) => void;
}

const EventContactsSection = ({ events, onSendIndividualMessage, onSendBulkMessage }: EventContactsSectionProps) => {
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const eventsWithContacts = events.filter(event => event.contacts.length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacts by Event</CardTitle>
        <CardDescription>
          Manage contacts organized by their events
        </CardDescription>
      </CardHeader>
      <CardContent>
        {eventsWithContacts.length > 0 ? (
          <div className="space-y-4">
            {eventsWithContacts.map((event) => {
              const isExpanded = expandedEvents.includes(event.id);
              return (
                <Collapsible key={event.id}>
                  <CollapsibleTrigger 
                    className="w-full"
                    onClick={() => toggleEventExpansion(event.id)}
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent">
                      <div className="flex items-center gap-3">
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <div className="text-left">
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.contacts.length} contacts • {format(new Date(event.date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSendBulkMessage(event.contacts, event.title);
                          }}
                          className="flex items-center gap-1"
                        >
                          <Send size={12} />
                          Bulk Message
                        </Button>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="mt-2 ml-8">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {event.contacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell className="font-medium">{contact.name}</TableCell>
                              <TableCell>{contact.phone}</TableCell>
                              <TableCell>{contact.email || "—"}</TableCell>
                              <TableCell>{format(new Date(contact.createdAt), "MMM d, yyyy")}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => onSendIndividualMessage(contact)}
                                  className="flex items-center gap-1"
                                >
                                  <Send size={12} />
                                  Message
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No contacts yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventContactsSection;
