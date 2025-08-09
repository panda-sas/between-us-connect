import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Users, Clock, Filter, Plus } from 'lucide-react';
import eventsImage from '@/assets/events-activities.jpg';

const mockEvents = [
  {
    id: 1,
    title: 'Coffee & Conversation',
    date: 'Saturday, Mar 16',
    time: '10:00 AM',
    location: 'Blue Bottle Coffee, Mission',
    distance: '1.2 miles',
    attendees: 12,
    maxAttendees: 15,
    category: 'Social',
    description: 'Casual coffee meetup for thoughtful conversations about life decisions and experiences.',
    host: 'Sarah Chen',
    isAttending: false
  },
  {
    id: 2,
    title: 'Hiking & Reflection',
    date: 'Sunday, Mar 17',
    time: '9:00 AM',
    location: 'Golden Gate Park',
    distance: '2.8 miles',
    attendees: 8,
    maxAttendees: 12,
    category: 'Outdoor',
    description: 'Morning hike followed by optional group discussion about life paths and decisions.',
    host: 'Marcus Johnson',
    isAttending: true
  },
  {
    id: 3,
    title: 'Book Club: "Maybe Baby"',
    date: 'Wednesday, Mar 20',
    time: '7:00 PM',
    location: 'Community Center, SOMA',
    distance: '0.8 miles',
    attendees: 15,
    maxAttendees: 20,
    category: 'Education',
    description: 'Discussion of Lori Gottlieb\'s "Maybe You Should Talk to Someone" and related topics.',
    host: 'Elena Rodriguez',
    isAttending: false
  },
  {
    id: 4,
    title: 'Cooking Class: Comfort Food',
    date: 'Friday, Mar 22',
    time: '6:30 PM',
    location: 'The Kitchen, Castro',
    distance: '1.9 miles',
    attendees: 6,
    maxAttendees: 10,
    category: 'Creative',
    description: 'Learn to make comforting dishes while connecting with others in a relaxed setting.',
    host: 'David Kim',
    isAttending: false
  }
];

interface EventsScreenProps {
  onNavigate: (tab: string) => void;
  onSelectEvent: (eventId: number) => void;
}

export const EventsScreen = ({ onNavigate, onSelectEvent }: EventsScreenProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      'Social': 'bg-primary-light text-primary',
      'Outdoor': 'bg-secondary-light text-secondary',
      'Education': 'bg-accent text-accent-foreground',
      'Creative': 'bg-muted text-muted-foreground'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card p-4 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Local Events</h1>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-xl"
          />
          <Button variant="outline" size="icon" className="rounded-xl">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="default" size="icon" className="rounded-xl">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['This Week', 'Social', 'Outdoor', 'Education', 'Creative', 'Free'].map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              onClick={() => {
                setSelectedFilters(prev => 
                  prev.includes(filter) 
                    ? prev.filter(f => f !== filter)
                    : [...prev, filter]
                );
              }}
              className="cursor-pointer rounded-full whitespace-nowrap"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={eventsImage} 
          alt="Community activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white">
          <p className="text-sm font-medium">Discover activities that matter to you</p>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {filteredEvents.map((event) => (
          <Card 
            key={event.id} 
            className="shadow-soft cursor-pointer hover:shadow-warm transition-shadow"
            onClick={() => onSelectEvent(event.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    {event.isAttending && (
                      <Badge variant="default" className="text-xs rounded-full">
                        Going
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location} • {event.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                  </div>
                </div>
                <Badge className={`rounded-full ${getCategoryColor(event.category)}`}>
                  {event.category}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Hosted by {event.host}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={event.isAttending ? "default" : "outline"} 
                    className="rounded-full"
                  >
                    {event.isAttending ? 'Going' : 'RSVP'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};