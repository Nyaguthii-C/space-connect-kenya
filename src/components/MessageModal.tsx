
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "@/lib/types";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: Contact;
  contacts?: Contact[];
  isBulk?: boolean;
  eventTitle?: string;
}

const MessageModal = ({ isOpen, onClose, contact, contacts, isBulk = false, eventTitle }: MessageModalProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate sending message
    setTimeout(() => {
      if (isBulk && contacts) {
        toast({
          title: "Messages Sent!",
          description: `Bulk message sent to ${contacts.length} contacts${eventTitle ? ` for "${eventTitle}"` : ''} successfully.`,
        });
      } else if (contact) {
        toast({
          title: "Message Sent!",
          description: `Message sent to ${contact.name} successfully.`,
        });
      }
      
      setMessage("");
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const getTitle = () => {
    if (isBulk) {
      return eventTitle ? `Send Bulk Message - ${eventTitle}` : "Send Bulk Message";
    }
    return contact ? `Send Message to ${contact.name}` : "Send Message";
  };

  const getDescription = () => {
    if (isBulk && contacts) {
      return `Send a message to all ${contacts.length} contacts${eventTitle ? ` for "${eventTitle}"` : ''}`;
    }
    return contact ? `Send a direct message to ${contact.name} (${contact.phone})` : "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
