import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types';
import { ArrowRight, Edit, Trash2 } from 'lucide-react';
import { deleteBlogPost } from '@/services/blogService';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from '@/components/Link';

interface BlogPostCardProps {
  post: BlogPost;
  onPostDeleted?: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onPostDeleted }) => {
  const [currentUser, setCurrentUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const { getCurrentUser } = await import('@/services/forumService');
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const isAuthor = currentUser && currentUser.id === post.user_id;

  const handleDelete = async () => {
    try {
      await deleteBlogPost(post.id);
      toast.success("Publicación eliminada con éxito.");
      onPostDeleted?.();
    } catch (error: any) {
      console.error("Error al eliminar la publicación:", error);
      toast.error(error.message || "Ocurrió un error al eliminar la publicación.");
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary text-balance">{post.title}</CardTitle>
        <p className="text-sm text-foreground text-balance">{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} por {post.author}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground text-balance">{post.summary}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Link to={`/blog/${post.id}`} className="w-full">
          <Button className="w-full">
            Leer Más <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        {isAuthor && (
          <div className="flex space-x-2 w-full">
            <Link to={`/admin/blog/edit/${post.id}`} className="w-1/2">
              <Button variant="outline" className="w-full flex items-center">
                <Edit className="mr-2 h-4 w-4" /> Editar
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-1/2 flex items-center">
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu publicación del blog.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;