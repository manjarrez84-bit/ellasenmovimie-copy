"use client";

import { useState, useEffect } from 'react';
import Link from '@/components/Link';
import { usePageContext } from 'vike-react/usePageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { getPostById, deleteBlogPost } from '@/services/blogService';
import { BlogPost } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
import SEOHead from '@/components/SEOHead';

const BlogPostPage = () => {
  const pageContext = usePageContext();
  const id = pageContext.routeParams.id;
  const navigate = pageContext.router.navigate;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        const { getCurrentUser } = await import('@/services/forumService');
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchData();
  }, [id]);

  const isAuthor = currentUser && post && currentUser.id === post.user_id;

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deleteBlogPost(post.id);
      toast.success("Publicación eliminada con éxito.");
      navigate('/blog');
    } catch (error: any) {
      console.error("Error al eliminar la publicación:", error);
      toast.error(error.message || "Ocurrió un error al eliminar la publicación.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-1/3 mb-8" /><Skeleton className="h-12 w-full mb-4" /><Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="w-full h-[500px] rounded-lg mb-8" />
            <div className="space-y-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-5/6" /></div>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
          <div><h1 className="text-4xl font-bold text-primary mb-4 text-balance">Publicación no encontrada</h1><p className="text-lg text-foreground mb-8 text-balance">Lo sentimos, no pudimos encontrar el artículo que estás buscando.</p><Link to="/blog"><Button>Volver al Blog</Button></Link></div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title={post.title}
        description={post.summary}
        path={`/blog/${post.id}`}
        image={post.image_url}
        type="article"
      />
      <Header />
      <main className="flex-grow py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <article>
            <div className="mb-8 flex justify-between items-center">
              <Link to="/blog" className="inline-flex items-center text-primary hover:underline"><ArrowLeft className="mr-2 h-4 w-4" />Volver a todas las publicaciones</Link>
              {isAuthor && (
                <div className="flex space-x-2">
                  <Link to={`/admin/blog/edit/${post.id}`}><Button variant="outline" size="sm" className="flex items-center"><Edit className="mr-2 h-4 w-4" /> Editar</Button></Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button variant="destructive" size="sm" className="flex items-center"><Trash2 className="mr-2 h-4 w-4" /> Eliminar</Button></AlertDialogTrigger>
                    <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 text-balance">{post.title}</h1>
            <p className="text-md text-foreground mb-8 text-balance">{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} por {post.author}</p>
            <img src={post.image_url} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />
            <div className="prose lg:prose-xl max-w-none dark:prose-invert text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default BlogPostPage;

export { route };
const route = { route: '/blog/:id', title: 'Publicación del Blog' };