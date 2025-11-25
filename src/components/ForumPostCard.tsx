import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ForumPost } from '@/types';
import { User } from 'lucide-react';

interface ForumPostCardProps {
  post: ForumPost;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post }) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="flex flex-col shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary text-balance">{post.title}</CardTitle>
        <div className="flex items-center text-sm text-foreground mt-1">
          <User className="h-4 w-4 mr-2" />
          <span>{post.author_email}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground whitespace-pre-wrap text-balance">{post.content}</p>
      </CardContent>
    </Card>
  );
};

export default ForumPostCard;