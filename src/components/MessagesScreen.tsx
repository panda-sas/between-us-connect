import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, MoreVertical, Send, ArrowLeft } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Chen',
    emoji: '✨',
    initials: 'SC',
    lastMessage: 'Looking forward to the coffee meetup tomorrow!',
    timestamp: '2m ago',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    emoji: '🤔',
    initials: 'MJ',
    lastMessage: 'Thanks for the book recommendation',
    timestamp: '1h ago',
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: 'Weekend Hikers',
    emoji: '🥾',
    initials: 'WH',
    lastMessage: 'Elena: The weather looks perfect for Sunday!',
    timestamp: '3h ago',
    unread: 5,
    online: true,
    isGroup: true
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    emoji: '🌱',
    initials: 'ER',
    lastMessage: 'Great discussion at book club!',
    timestamp: 'Yesterday',
    unread: 0,
    online: false
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 'Sarah Chen',
    message: 'Hey! Thanks for connecting. I saw you\'re also in the undecided camp about kids.',
    timestamp: '10:30 AM',
    isSelf: false
  },
  {
    id: 2,
    sender: 'You',
    message: 'Hi Sarah! Yes, it\'s such a big decision. I love that there\'s a community where we can talk about it openly.',
    timestamp: '10:32 AM',
    isSelf: true
  },
  {
    id: 3,
    sender: 'Sarah Chen',
    message: 'Absolutely! Are you planning to come to the coffee meetup tomorrow? It would be great to meet in person.',
    timestamp: '10:35 AM',
    isSelf: false
  },
  {
    id: 4,
    sender: 'You',
    message: 'I am! Looking forward to it. Have you been to many of these events?',
    timestamp: '10:37 AM',
    isSelf: true
  },
  {
    id: 5,
    sender: 'Sarah Chen',
    message: 'This will be my third one. Everyone\'s been so welcoming and understanding. It\'s refreshing to have these conversations without judgment.',
    timestamp: '10:40 AM',
    isSelf: false
  },
  {
    id: 6,
    sender: 'Sarah Chen',
    message: 'Looking forward to the coffee meetup tomorrow!',
    timestamp: '2m ago',
    isSelf: false
  }
];

interface MessagesScreenProps {
  onNavigate: (tab: string) => void;
}

export const MessagesScreen = ({ onNavigate }: MessagesScreenProps) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
      // In a real app, this would send the message
    }
  };

  if (selectedConversation) {
    const conversation = mockConversations.find(c => c.id === selectedConversation);
    
    return (
      <div className="pb-20 bg-background min-h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-card p-4 border-b border-border flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedConversation(null)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-warm">
              {conversation?.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="font-semibold">{conversation?.name}</h2>
            <p className="text-sm text-muted-foreground">
              {conversation?.online ? 'Online' : 'Last seen 2h ago'}
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isSelf
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isSelf ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card p-4 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-4 space-y-2">
        {filteredConversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="cursor-pointer hover:shadow-soft transition-shadow"
            onClick={() => setSelectedConversation(conversation.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-warm">
                      {conversation.initials}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{conversation.name}</h3>
                      {conversation.isGroup && (
                        <Badge variant="outline" className="text-xs rounded-full">
                          Group
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {conversation.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge className="ml-2 min-w-[20px] h-5 flex items-center justify-center text-xs rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};