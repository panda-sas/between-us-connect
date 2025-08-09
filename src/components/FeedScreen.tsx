import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Filter, Plus, MapPin, Clock, MoreHorizontal } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: 'Sarah Chen',
    authorEmoji: '✨',
    authorInitials: 'SC',
    authorStage: 'Leaning Yes',
    location: 'San Francisco',
    timeAgo: '2h ago',
    content: "Anyone else feeling overwhelmed by all the conflicting advice about having kids? One day I read something that makes me excited about parenthood, the next day I'm terrified. How do you filter through all the noise?",
    likes: 12,
    comments: 8,
    isLiked: false,
    tags: ['advice', 'overwhelmed'],
    type: 'question'
  },
  {
    id: 2,
    author: 'Marcus Johnson',
    authorEmoji: '🤔',
    authorInitials: 'MJ',
    authorStage: 'Undecided',
    location: 'Oakland',
    timeAgo: '4h ago',
    content: "Spent the weekend with my sister's kids and honestly... it was exhausting but also kind of amazing? They're 3 and 5, total chaos but so much joy. Still processing how I feel about it all.",
    likes: 15,
    comments: 6,
    isLiked: true,
    tags: ['family', 'experience'],
    type: 'thought'
  },
  {
    id: 3,
    author: 'Elena Rodriguez',
    authorEmoji: '🌱',
    authorInitials: 'ER',
    authorStage: 'Leaning No',
    location: 'Berkeley',
    timeAgo: '6h ago',
    content: "Quick reminder that whatever you decide is valid. There's no 'right' timeline or 'right' choice. Trust your gut and don't let anyone pressure you into a decision that doesn't feel authentic to you. 💚",
    likes: 23,
    comments: 4,
    isLiked: true,
    tags: ['support', 'validation'],
    type: 'thought'
  },
  {
    id: 4,
    author: 'David Kim',
    authorEmoji: '🤔',
    authorInitials: 'DK',
    authorStage: 'Undecided',
    location: 'San Francisco',
    timeAgo: '1d ago',
    content: "Partner and I had 'the conversation' again last night. We're both on the fence but leaning different directions. How do couples navigate this when you're not aligned? Any advice from those who've been there?",
    likes: 18,
    comments: 12,
    isLiked: false,
    tags: ['relationship', 'advice', 'couples'],
    type: 'question'
  }
];

const topics = ['All', 'Questions', 'Thoughts', 'Support', 'Experiences', 'Relationships', 'Local'];

interface FeedScreenProps {
  onNavigate: (tab: string) => void;
  onSelectPost: (postId: number) => void;
}

export const FeedScreen = ({ onNavigate, onSelectPost }: FeedScreenProps) => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<'thought' | 'question'>('thought');
  const [likedPosts, setLikedPosts] = useState<number[]>([2, 3]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handlePost = () => {
    if (newPostContent.trim()) {
      setNewPostContent('');
      setShowNewPost(false);
      // In a real app, this would create a new post
    }
  };

  const filteredPosts = mockPosts.filter(post => {
    if (selectedTopic === 'All') return true;
    if (selectedTopic === 'Questions') return post.type === 'question';
    if (selectedTopic === 'Thoughts') return post.type === 'thought';
    if (selectedTopic === 'Local') return post.location.includes('San Francisco');
    return post.tags.some(tag => tag.toLowerCase().includes(selectedTopic.toLowerCase()));
  });

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card p-4 border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Community Feed</h1>
          <Button
            onClick={() => setShowNewPost(true)}
            className="rounded-full"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Post
          </Button>
        </div>

        {/* Topic Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopic === topic ? "default" : "outline"}
              onClick={() => setSelectedTopic(topic)}
              className="cursor-pointer rounded-full whitespace-nowrap"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-warm">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Share your thoughts</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewPost(false)}
                  className="rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={newPostType === 'thought' ? 'default' : 'outline'}
                  onClick={() => setNewPostType('thought')}
                  size="sm"
                  className="rounded-full"
                >
                  💭 Thought
                </Button>
                <Button
                  variant={newPostType === 'question' ? 'default' : 'outline'}
                  onClick={() => setNewPostType('question')}
                  size="sm"
                  className="rounded-full"
                >
                  ❓ Question
                </Button>
              </div>

              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={newPostType === 'question' 
                  ? "What would you like to ask the community?" 
                  : "What's on your mind?"}
                rows={4}
                className="resize-none rounded-xl"
              />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePost}
                  disabled={!newPostContent.trim()}
                  className="flex-1 rounded-xl"
                >
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feed */}
      <div className="p-4 space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="shadow-soft">
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-warm">
                      {post.authorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author}</span>
                      <Badge variant="outline" className="text-xs rounded-full">
                        {post.authorStage}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                      <Clock className="w-3 h-3 ml-1" />
                      {post.timeAgo}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div 
                className="mb-4 cursor-pointer"
                onClick={() => onSelectPost(post.id)}
              >
                <p className="text-foreground leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1 text-sm transition-colors hover:text-primary"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedPosts.includes(post.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                    <span className={likedPosts.includes(post.id) ? 'text-red-500' : 'text-muted-foreground'}>
                      {post.likes + (likedPosts.includes(post.id) && !post.isLiked ? 1 : 0)}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => onSelectPost(post.id)}
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <Share className="w-4 h-4" />
                  </button>
                </div>

                <Badge 
                  variant={post.type === 'question' ? 'default' : 'secondary'} 
                  className="text-xs rounded-full"
                >
                  {post.type === 'question' ? '❓' : '💭'} {post.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};