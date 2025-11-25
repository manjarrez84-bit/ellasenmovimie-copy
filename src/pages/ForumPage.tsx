"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { ForumPost } from '@/types';
import { getForumPosts, getCurrentUser, onAuthStateChange, signOut } from '@/services/forumService';
import ForumPostCard from '@/components/ForumPostCard';
import CreatePostForm from '@/components/forms/CreatePostForm';
import AuthForm from '@/components/AuthForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { User as UserIcon, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const ForumPage = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getForumPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('No se pudieron cargar las publicaciones del foro. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuthChange = useCallback(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    fetchPosts(); // Refresh posts when auth state changes
  }, [fetchPosts]);

  useEffect(() => {
    handleAuthChange(); // Initial check
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      handleAuthChange();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Sesión cerrada con éxito.");
      setUser(null);
      fetchPosts();
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      toast.error(error.message || "Ocurrió un error al cerrar sesión.");
    }
  };

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3 p-6 bg-card rounded-lg shadow-lg">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full" />
      </div>
    ))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Foro de la Comunidad</h1>
            <p className="text-lg text-foreground max-w-3xl mx-auto text-balance">
              Un espacio para compartir ideas, hacer preguntas y conectar con nuestra comunidad.
            </p>
          </div>

          <div className="mb-12">
            {user ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-foreground">
                  <UserIcon className="h-5 w-5" />
                  <span>Bienvenido, {user.email}</span>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </Button>
                <div className="w-full mt-8">
                  <CreatePostForm userId={user.id} authorEmail={user.email} onPostCreated={fetchPosts} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-lg text-foreground text-balance">
                  Inicia sesión o regístrate para participar en el foro.
                </p>
                <AuthForm onAuthSuccess={handleAuthChange} />
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-primary mb-8 text-center text-balance">Últimas Publicaciones</h2>
          {error && <p className="text-center text-destructive mb-8">{error}</p>}
          <div className="space-y-8">
            {loading ? renderSkeletons() : posts.length > 0 ? (
              posts.map(post => (
                <ForumPostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-center text-foreground text-balance">No hay publicaciones en el foro todavía. ¡Sé el primero en publicar!</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default ForumPage;