import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Heart, MessageCircle, Share, Send, MapPin, Clock, MoreHorizontal } from 'lucide-react';

const mockPost = {
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
};

const mockComments = [
  {
    id: 1,
    author: 'Marcus Johnson',
    authorEmoji: '🤔',
    authorInitials: 'MJ',
    timeAgo: '1h ago',
    content: "I totally feel this! I've started limiting my research to like 30 minutes a week max. Too much information was making me more anxious, not more informed.",
    likes: 5,
    isLiked: true
  },
  {
    id: 2,
    author: 'Elena Rodriguez',
    authorEmoji: '🌱',
    authorInitials: 'ER',
    timeAgo: '45m ago',
    content: "What helped me was talking to actual parents about their real experiences - not the highlight reel stuff. Ask about the mundane daily reality, not just the big moments.",
    likes: 8,
    isLiked: false
  },
  {
    id: 3,
    author: 'David Kim',
    authorEmoji: '🤔',
    authorInitials: 'DK',
    timeAgo: '30m ago',
    content: "Remember that most advice is based on someone else's values and circumstances. What matters is figuring out what feels right for YOUR life and situation.",
    likes: 6,
    isLiked: true
  },
  {
    id: 4,
    author: 'Lisa Martinez',
    authorEmoji: '✨',
    authorInitials: 'LM',
    timeAgo: '15m ago',
    content: "I made a pros and cons list but then realized I was trying to logic my way through something that's also deeply emotional. Sometimes you just have to sit with the uncertainty.",
    likes: 4,
    isLiked: false
  }
];

interface PostDetailsProps {
  postId: number;
  onBack: () => void;
}

export const PostDetails = ({ postId, onBack }: PostDetailsProps) => {
  const [isLiked, setIsLiked] = useState(mockPost.isLiked);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<number[]>([1, 3]);

  const togglePostLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleCommentLike = (commentId: number) => {
    setLikedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setNewComment('');
      // In a real app, this would post the comment
    }
  };

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card p-4 border-b border-border flex items-center gap-3 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Post Discussion</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Original Post */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-warm">
                    {mockPost.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{mockPost.author}</span>
                    <Badge variant="outline" className="text-xs rounded-full">
                      {mockPost.authorStage}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {mockPost.location}
                    <Clock className="w-3 h-3 ml-1" />
                    {mockPost.timeAgo}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Post Content */}
            <p className="text-foreground leading-relaxed mb-4">
              {mockPost.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {mockPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePostLike}
                  className="flex items-center gap-1 text-sm transition-colors hover:text-primary"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isLiked 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                  <span className={isLiked ? 'text-red-500' : 'text-muted-foreground'}>
                    {mockPost.likes + (isLiked && !mockPost.isLiked ? 1 : 0)}
                  </span>
                </button>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>{mockPost.comments}</span>
                </div>
                
                <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Share className="w-4 h-4" />
                </button>
              </div>

              <Badge 
                variant={mockPost.type === 'question' ? 'default' : 'secondary'} 
                className="text-xs rounded-full"
              >
                {mockPost.type === 'question' ? '❓' : '💭'} {mockPost.type}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Comments ({mockComments.length})</h3>
            
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-muted pl-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-warm text-xs">
                        {comment.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed mb-2">
                        {comment.content}
                      </p>
                      <button
                        onClick={() => toggleCommentLike(comment.id)}
                        className="flex items-center gap-1 text-xs transition-colors hover:text-primary"
                      >
                        <Heart 
                          className={`w-3 h-3 ${
                            likedComments.includes(comment.id)
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                        <span className={likedComments.includes(comment.id) ? 'text-red-500' : 'text-muted-foreground'}>
                          {comment.likes + (likedComments.includes(comment.id) && !comment.isLiked ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Comment */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Add your thoughts</h4>
            <div className="space-y-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your perspective..."
                rows={3}
                className="resize-none rounded-xl"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="rounded-xl"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};