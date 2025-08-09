import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Filter, Heart, MessageCircle, Coffee } from 'lucide-react';

const mockPeople = [
  {
    id: 1,
    name: 'Sarah Chen',
    age: 32,
    location: '2.3 miles away',
    stage: 'Leaning Yes',
    emoji: '✨',
    interests: ['Coffee', 'Books', 'Hiking'],
    bio: 'Marketing professional exploring life decisions. Love weekend farmers markets and deep conversations.',
    mutualConnections: 3
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    age: 35,
    location: '1.8 miles away',
    stage: 'Undecided',
    emoji: '🤔',
    interests: ['Fitness', 'Cooking', 'Movies'],
    bio: 'Software engineer who enjoys cooking and weekend adventures. Looking for thoughtful community.',
    mutualConnections: 1
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    age: 29,
    location: '3.1 miles away',
    stage: 'Leaning No',
    emoji: '🌱',
    interests: ['Art', 'Travel', 'Yoga'],
    bio: 'Graphic designer passionate about travel and mindful living. Love exploring new neighborhoods.',
    mutualConnections: 5
  },
  {
    id: 4,
    name: 'David Kim',
    age: 38,
    location: '1.2 miles away',
    stage: 'Undecided',
    emoji: '🤔',
    interests: ['Music', 'Photography', 'Coffee'],
    bio: 'Photographer who loves live music and discovering hidden coffee spots around the city.',
    mutualConnections: 2
  }
];

interface PeopleScreenProps {
  onNavigate: (tab: string) => void;
}

export const PeopleScreen = ({ onNavigate }: PeopleScreenProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredPeople = mockPeople.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.interests.some(interest => 
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card p-4 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Find Your People</h1>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search by name or interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-xl"
          />
          <Button variant="outline" size="icon" className="rounded-xl">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Nearby', 'Leaning Yes', 'Undecided', 'Leaning No', 'New Members'].map((filter) => (
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

      {/* People List */}
      <div className="p-4 space-y-4">
        {filteredPeople.map((person) => (
          <Card key={person.id} className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center text-xl">
                    {person.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold">{person.name}, {person.age}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {person.location}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="rounded-full">
                  {person.stage}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {person.bio}
              </p>

              {/* Interests */}
              <div className="flex flex-wrap gap-1 mb-4">
                {person.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs rounded-full">
                    {interest}
                  </Badge>
                ))}
              </div>

              {/* Mutual Connections */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="w-3 h-3" />
                  {person.mutualConnections} mutual connections
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Coffee className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                  <Button size="sm" className="rounded-full">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
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