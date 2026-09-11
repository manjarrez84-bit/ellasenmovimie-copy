"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  FileText,
  MessageSquare,
  Heart,
  Mail,
  Edit,
  Trash2,
  Loader2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  LayoutDashboard,
  Settings,
  ChevronRight,
} from "lucide-react";
import { getAllPosts, deleteBlogPost } from "@/services/blogService";
import { getForumPosts, deleteForumPost } from "@/services/forumService";
import { getAllUserProfiles, updateUserRole } from "@/services/profileService";
import { BlogPost } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);
  const [stats, setStats] = useState({
    users: 0,
    blogPosts: 0,
    forumPosts: 0,
    donations: 0,
  });
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      setLoadingData(true);
      setError(null);

      const [posts, forum, profiles] = await Promise.all([
        getAllPosts(),
        getForumPosts(),
        getAllUserProfiles(),
      ]);

      setBlogPosts(posts);
      setForumPosts(forum);
      setUserProfiles(profiles);
      setStats({
        users: profiles.length,
        blogPosts: posts.length,
        forumPosts: forum.length,
        donations: 0,
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Error al cargar los datos del panel de administración.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Acceso denegado. Solo los administradores pueden acceder a esta página.");
      navigate("/");
      return;
    }

    if (isAdmin) {
      fetchAllData();
    }
  }, [loading, isAdmin, navigate, fetchAllData]);

  const handleDeleteBlogPost = async (postId: string) => {
    try {
      await deleteBlogPost(postId);
      toast.success("Publicación eliminada con éxito.");
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar la publicación.");
    }
  };

  const handleToggleUserRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";
      await updateUserRole(userId, newRole);
      toast.success(`Rol actualizado a ${newRole === "admin" ? "Administrador" : "Usuario"}.`);
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el rol.");
    }
  };

  if (loading || loadingData) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-lg text-foreground text-balance">Cargando panel de administración...</p>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <div className="text-center">
            <ShieldAlert className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h1 className="text-4xl font-bold text-destructive mb-4 text-balance">Acceso Denegado</h1>
            <p className="text-lg text-foreground mb-8 text-balance">No tienes los permisos necesarios para ver esta página.</p>
            <Link to="/">
              <Button>Volver al Inicio</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2 text-balance">Panel de Administración</h1>
            <p className="text-lg text-foreground text-balance">Bienvenido, {user?.email}. Gestiona todo el contenido y usuarios de la plataforma.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios</CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.users}</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Publicaciones Blog</CardTitle>
                <FileText className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.blogPosts}</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Publicaciones Foro</CardTitle>
                <MessageSquare className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.forumPosts}</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Donaciones</CardTitle>
                <Heart className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.donations}</div>
              </CardContent>
            </Card>
          </div>

          {error && <p className="text-center text-destructive mb-6">{error}</p>}

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Vista General
              </TabsTrigger>
              <TabsTrigger value="blog">
                <FileText className="h-4 w-4 mr-2" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="forum">
                <MessageSquare className="h-4 w-4 mr-2" />
                Foro
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="h-4 w-4 mr-2" />
                Usuarios
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Últimas Publicaciones de Blog
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingData ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    ) : blogPosts.length > 0 ? (
                      <div className="space-y-2">
                        {blogPosts.slice(0, 5).map((post) => (
                          <div key={post.id} className="flex items-center justify-between py-2 border-b">
                            <Link to={`/blog/${post.id}`} className="text-sm font-medium hover:text-primary">
                              {post.title}
                            </Link>
                            <div className="flex items-center space-x-2">
                              <Link to={`/admin/blog/edit/${post.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>¿Eliminar esta publicación?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción no se puede deshacer.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteBlogPost(post.id)} className="bg-destructive text-destructive-foreground">
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay publicaciones.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Usuarios Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingData ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    ) : userProfiles.length > 0 ? (
                      <div className="space-y-2">
                        {userProfiles.slice(0, 5).map((profile) => (
                          <div key={profile.id} className="flex items-center justify-between py-2 border-b">
                            <span className="text-sm">{profile.email}</span>
                            {profile.role === "admin" ? (
                              <ShieldCheck className="h-4 w-4 text-primary" />
                            ) : (
                              <Shield className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay usuarios.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gestionar Publicaciones de Blog</CardTitle>
                  <Link to="/admin/blog/new">
                    <Button>Nueva Publicación</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Autor</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>{new Date(post.date).toLocaleDateString('es-ES')}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Link to={`/admin/blog/edit/${post.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Eliminar "{post.title}"?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción no se puede deshacer.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteBlogPost(post.id)} className="bg-destructive text-destructive-foreground">
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forum Tab */}
            <TabsContent value="forum" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestionar Publicaciones del Foro</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : forumPosts.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Autor</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {forumPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{post.author_email}</TableCell>
                            <TableCell>{new Date(post.created_at).toLocaleDateString('es-ES')}</TableCell>
                            <TableCell className="text-right">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>¿Eliminar esta publicación?</AlertDialogTitle>
                                    <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={async () => {
                                      try {
                                        await deleteForumPost(post.id);
                                        toast.success("Publicación eliminada.");
                                        fetchAllData();
                                      } catch (e) {
                                        toast.error("Error al eliminar.");
                                      }
                                    }} className="bg-destructive text-destructive-foreground">
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No hay publicaciones en el foro.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestionar Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userProfiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell>{profile.email}</TableCell>
                            <TableCell>
                              {profile.role === "admin" ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                  <ShieldCheck className="h-3 w-3 mr-1" />
                                  Admin
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Usuario
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleToggleUserRole(profile.id, profile.role)}>
                                    {profile.role === "admin" ? "Quitar admin" : "Hacer admin"}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;