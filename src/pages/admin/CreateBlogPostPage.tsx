"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from '@/components/made-with-dyad';
import CreateBlogPostForm from '@/components/forms/CreateBlogPostForm';
import AuthForm from '@/components/AuthForm';
import { getCurrentUser, onAuthStateChange } from '@/services/forumService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/services/forumService';
import { toast } from 'sonner';

const CreateBlogPostPage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    setLoading(true);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      checkUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUser]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Sesión cerrada con éxito.");
      setUser(null);
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      toast.error(error.message || "Ocurrió un error al cerrar sesión.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <p className="text-lg text-foreground text-balance">Cargando...</p>
        </main>
        <Footer />
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Administración de Blog</h1>
            <p className="text-lg text-foreground max-w-3xl mx-auto text-balance">
              Crea nuevas publicaciones para el blog de la comunidad.
            </p>
          </div>

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
                <CreateBlogPostForm userId={user.id} authorEmail={user.email} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg text-foreground text-balance">
                Inicia sesión para crear nuevas publicaciones de blog.
              </p>
              <AuthForm onAuthSuccess={checkUser} />
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default CreateBlogPostPage;