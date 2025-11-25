import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from '@/components/made-with-dyad';
import BlogPostCard from '@/components/BlogPostCard';
import { getAllPosts } from '@/services/blogService';
import { getCurrentUser, onAuthStateChange } from '@/services/forumService';
import { BlogPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError('No se pudieron cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchPosts();
    checkUser();

    const { data: { subscription } = { subscription: { unsubscribe: () => {} } } } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    ))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Noticias y Actualizaciones</h1>
              <p className="text-lg text-foreground max-w-3xl mx-auto text-balance">
                Mantente al día con nuestras últimas noticias, historias de impacto y próximos eventos.
              </p>
              
              {/* Botón para crear post, visible solo si el usuario está logueado */}
              {user && (
                <div className="mt-6">
                  <Link to="/admin/blog/new">
                    <Button className="flex items-center space-x-2">
                      <PlusCircle className="h-5 w-5" />
                      <span>Crear Nueva Publicación</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            {error && <p className="text-center text-destructive mb-8">{error}</p>}
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderSkeletons()}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-card rounded-lg shadow-lg">
                <p className="text-xl text-foreground font-semibold">
                  Aún no hay publicaciones en el blog. ¡Sé el primero en crear una!
                </p>
                {user && (
                  <div className="mt-6">
                    <Link to="/admin/blog/new">
                      <Button className="flex items-center space-x-2">
                        <PlusCircle className="h-5 w-5" />
                        <span>Crear Publicación</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default BlogPage;