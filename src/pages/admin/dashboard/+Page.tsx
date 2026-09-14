"use client";

import { useState, useEffect } from 'react';
import { navigate } from 'vike/client/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts, deleteBlogPost } from '@/services/blogService';
import { getAllUserProfiles, updateUserRole, deleteUserProfile } from '@/services/profileService';
import { BlogPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Edit, Trash2, ArrowLeft, Users, Shield, Mail } from 'lucide-react';

const Page = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts');

  useEffect(() => {
    const checkAuth = async () => {
      const { getCurrentUser } = await import('@/services/forumService');
      const user = await getCurrentUser();
      if (!user) {
        navigate('/');
        return;
      }
      const { getUserProfile } = await import('@/services/profileService');
      const profile = await getUserProfile(user.id);
      if (!profile || profile.role !== 'admin') {
        setLoading(false);
        return;
      }
      fetchData();
    };
    checkAuth();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [fetchedPosts, fetchedUsers] = await Promise.all([
        getAllPosts(),
        getAllUserProfiles()
      ]);
      setPosts(fetchedPosts);
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) return;
    try {
      await deleteBlogPost(id);
      toast.success("Publicación eliminada.");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar la publicación.");
    }
  };

  const handleUpdateRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await updateUserRole(userId, newRole as 'admin' | 'user');
      toast.success(`Rol actualizado a ${newRole}.`);
      fetchData();
    } catch (error: any) {
      toast.error("Error al actualizar el rol.");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;
    try {
      await deleteUserProfile(userId);
      toast.success("Usuario eliminado.");
      fetchData();
    } catch (error: any) {
      toast.error("Error al eliminar el usuario.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[300px] rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!posts.length && !users.length) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Acceso Denegado</h1>
            <p className="text-lg text-foreground mb-8 text-balance">No tienes permisos de administrador para acceder a esta página.</p>
            <a href="/">
              <Button>Volver al Inicio</Button>
            </a>
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
      <main className="flex-grow py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <a href="/" className="inline-flex items-center text-primary hover:underline mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
              </a>
              <h1 className="text-4xl font-bold text-primary text-balance">Panel de Administración</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'posts' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'}`}
              >
                <Shield className="inline h-4 w-4 mr-2" /> Publicaciones
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'users' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'}`}
              >
                <Users className="inline h-4 w-4 mr-2" /> Usuarios
              </button>
            </div>
          </div>

          {activeTab === 'posts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Publicaciones del Blog</h2>
                <a href="/admin/blog/new">
                  <Button>Crear Nueva Publicación</Button>
                </a>
              </div>
              {posts.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-lg shadow">
                  <p className="text-xl text-foreground mb-4">No hay publicaciones aún.</p>
                  <a href="/admin/blog/new">
                    <Button>Crear Primera Publicación</Button>
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map(post => (
                    <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <img src={post.image_url || '/logo.png'} alt={post.title} className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary text-balance line-clamp-2">{post.title}</CardTitle>
                        <p className="text-sm text-foreground text-balance">{post.author} • {new Date(post.date).toLocaleDateString('es-ES')}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground text-balance line-clamp-3">{post.summary}</p>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <a href={`/admin/blog/edit/${post.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </Button>
                        </a>
                        <Button variant="destructive" size="sm" className="flex-1 flex items-center justify-center" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Usuarios Registrados</h2>
              {users.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-lg shadow">
                  <p className="text-xl text-foreground">No hay usuarios registrados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map(user => (
                    <Card key={user.id} className="overflow-hidden shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary text-balance flex items-center gap-2">
                          <Mail className="h-5 w-5" /> {user.email}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className={`h-4 w-4 ${user.role === 'admin' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                          <span className={`text-sm font-semibold ${user.role === 'admin' ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleUpdateRole(user.id, user.role)}
                        >
                          {user.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
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