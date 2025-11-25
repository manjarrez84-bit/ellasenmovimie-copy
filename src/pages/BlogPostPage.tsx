import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getPostById } from '@/services/blogService';
import { BlogPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-1/3 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="w-full h-[500px] rounded-lg mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          </div>
        </main>
        <Footer />
        <MadeWithDyad />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Publicación no encontrada</h1>
            <p className="text-lg text-foreground mb-8 text-balance">Lo sentimos, no pudimos encontrar el artículo que estás buscando.</p>
            <Link to="/blog">
              <Button>Volver al Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <article>
            <div className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a todas las publicaciones
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 text-balance">{post.title}</h1>
            <p className="text-md text-foreground mb-8 text-balance">{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} por {post.author}</p>
            
            <img src={post.image_url} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />

            <div className="prose lg:prose-xl max-w-none dark:prose-invert text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default BlogPostPage;