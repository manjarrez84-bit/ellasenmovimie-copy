"use client";

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import ForumPostCard from '@/components/ForumPostCard';
import CreatePostForm from '@/components/forms/CreatePostForm';
import AuthForm from '@/components/AuthForm';
import { getForumPosts, getCurrentUser, onAuthStateChange } from '@/services/forumService';
import { ForumPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, PlusCircle, LogIn } from 'lucide-react';

const Page = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getForumPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err: any) {
      console.error("Error al obtener las publicaciones del foro:", err);
      setError('No se pudieron cargar las publicaciones del foro.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchPosts();
    checkUser();

    const { data: { subscription } = { subscription: { unsubscribe: () => {} } } } = onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchPosts]);

  return (
      <div className="flex flex-col min-h-screen">
        <Header />
      <main className="flex-grow py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">
              Foro Comunitario
            </h1>
            <p className="text-lg text-foreground max-w-2xl mx-auto text-balance">
              Un espacio seguro para compartir reflexiones, experiencias, preguntas y apoyarnos mutuamente.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              {user ? (
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <PlusCircle className="h-5 w-5" />
                      <span>Crear Publicación</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl p-0 overflow-hidden">
                    <CreatePostForm
                      userId={user.id}
                      authorEmail={user.email || ''}
                      onPostCreated={() => {
                        setIsCreateOpen(false);
                        fetchPosts();
                      }}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <LogIn className="h-5 w-5" />
                      <span>Inicia sesión para participar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-0 overflow-hidden">
                    <AuthForm
                      onAuthSuccess={() => {
                        setIsAuthOpen(false);
                        getCurrentUser().then(setUser);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 mb-8 bg-destructive/10 text-destructive rounded-lg text-center">
              {error}
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-card rounded-lg shadow space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg shadow p-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No hay publicaciones aún</h2>
              <p className="text-muted-foreground mb-6">¡Sé la primera persona en iniciar una conversación!</p>
              {!user && (
                <Button onClick={() => setIsAuthOpen(true)}>
                  Iniciar Sesión
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;
