import React, { useState, useEffect, useCallback } from 'react';
import { usePageContext } from 'vike';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import BlogPostForm from '@/components/forms/BlogPostForm';
import AuthForm from '@/components/AuthForm';
import { getCurrentUser, onAuthStateChange, signOut } from '@/services/forumService';
import { getPostById } from '@/services/blogService';
import { User as UserIcon, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BlogPost } from '@/types';

const EditBlogPostPage = () => {
  const { routeParams, navigate } = usePageContext();
  const id = routeParams.id as string;
  const [user, setUser] = useState<any | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);

  const checkUser = useCallback(async () => {
    setLoadingUser(true);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoadingUser(false);
  }, []);

  const fetchPost = useCallback(async () => {
    if (!id) {
      toast.error("ID de publicación no proporcionado.");
      navigate('/blog');
      return;
    }
    setLoadingPost(true);
    try {
      const fetchedPost = await getPostById(id);
      if (!fetchedPost) {
        toast.error("Publicación no encontrada.");
        navigate('/blog');
        return;
      }
      setPost(fetchedPost);
    } catch (error: any) {
      console.error("Error al cargar la publicación:", error);
      toast.error(error.message || "Ocurrió un error al cargar la publicación.");
      navigate('/blog');
    } finally {
      setLoadingPost(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    checkUser();
    fetchPost();

    const { data: { subscription } } = onAuthStateChange((_event, _session) => {
      checkUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUser, fetchPost]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Sesión cerrada con éxito.");
      setUser(null);
      navigate('/blog');
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      toast.error(error.message || "Ocurrió un error al cerrar sesión.");
    }
  };

  if (loadingUser || loadingPost) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <p className="text-lg text-foreground text-balance">Cargando...</p>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Editar Publicación de Blog</h1>
            <p className="text-lg text-foreground max-w-3xl mx-auto text-balance">
              Inicia sesión para editar publicaciones de blog.
            </p>
            <AuthForm onAuthSuccess={checkUser} />
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!post || user.id !== post.user_id) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Acceso Denegado</h1>
            <p className="text-lg text-foreground mb-8 text-balance">
              No tienes permiso para editar esta publicación o la publicación no existe.
            </p>
            <Link to="/blog">
              <Button>Volver al Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a todas las publicaciones
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="flex items-center space-x-2 text-lg font-semibold text-foreground">
              <UserIcon className="h-5 w-5" />
              <span>Bienvenido, {user.email}</span>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
          <BlogPostForm userId={user.id} authorEmail={user.email} initialData={post} onSubmissionSuccess={fetchPost} />
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default EditBlogPostPage;