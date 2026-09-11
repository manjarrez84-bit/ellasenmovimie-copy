import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import { getAllPosts, deleteBlogPost } from '@/services/blogService';
import { getCurrentUser, onAuthStateChange } from '@/services/forumService';
import { getUserProfile } from '@/services/profileService';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Loader2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchPosts = useCallback(async () => {
    try { setLoading(true); const fetchedPosts = await getAllPosts(); setPosts(fetchedPosts); }
    catch (err) { console.error("Error fetching blog posts:", err); setError('No se pudieron cargar las publicaciones del blog.'); }
    finally { setLoading(false); }
  }, []);

  const checkUserAndRole = useCallback(async () => {
    setLoading(true);
    const currentUser = await getCurrentUser();
    if (currentUser) {
      try {
        const profile = await getUserProfile(currentUser.id);
        if (profile && profile.role === 'admin') { setIsAdmin(true); fetchPosts(); }
        else { setIsAdmin(false); toast.error("Acceso denegado."); navigate('/'); }
      } catch (profileError) {
        console.error("Error fetching user profile:", profileError);
        setIsAdmin(false); toast.error("Error al verificar el rol."); navigate('/');
      }
    } else { setIsAdmin(false); toast.error("Debes iniciar sesión."); navigate('/forum'); }
    setLoading(false);
  }, [fetchPosts, navigate]);

  useEffect(() => {
    checkUserAndRole();
    const { data: { subscription } } = onAuthStateChange((_event, _session) => { checkUserAndRole(); });
    return () => { subscription.unsubscribe(); };
  }, [checkUserAndRole]);

  const handleDelete = async (postId: string) => {
    try { await deleteBlogPost(postId); toast.success("Publicación eliminada."); fetchPosts(); }
    catch (error: any) { toast.error(error.message || "Ocurrió un error."); }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-2 text-lg text-foreground text-balance">Cargando panel...</p>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-24 bg-muted/30">
          <div className="text-center"><h1 className="text-4xl font-bold text-destructive mb-4 text-balance">Acceso Denegado</h1><p className="text-lg text-foreground mb-8 text-balance">No tienes los permisos necesarios.</p><Link to="/"><Button>Volver al Inicio</Button></Link></div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Panel de Administración"
        description="Panel de administración del blog de Ellas en Movimiento."
        path="/admin/dashboard"
      />
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Panel de Administración del Blog</h1>
            <p className="text-lg text-foreground max-w-3xl mx-auto text-balance">Gestiona todas las publicaciones.</p>
            <div className="mt-6"><Link to="/admin/blog/new"><Button>Crear Nueva Publicación</Button></Link></div>
          </div>
          {error && <p className="text-center text-destructive mb-8">{error}</p>}
          {posts.length === 0 && !loading && !error ? (
            <div className="text-center p-10 bg-card rounded-lg shadow-lg"><p className="text-xl text-foreground font-semibold text-balance">No hay publicaciones.</p></div>
          ) : (
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <Table>
                <TableHeader><TableRow><TableHead className="w-[200px]">Título</TableHead><TableHead>Autor</TableHead><TableHead>Fecha</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium text-balance">{post.title}</TableCell>
                      <TableCell className="text-balance">{post.author}</TableCell>
                      <TableCell className="text-balance">{new Date(post.date).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/admin/blog/edit/${post.id}`}><Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button></Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle><AlertDialogDescription>Esto eliminará "{post.title}".</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(post.id)}>Eliminar</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default AdminDashboardPage;