import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import { getCurrentUser, onAuthStateChange, signOut } from '@/services/forumService';
import { getUserProfile } from '@/services/profileService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Mail, Tag, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      try {
        const profile = await getUserProfile(currentUser.id);
        setUserRole(profile?.role || 'user');
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error al cargar el perfil del usuario.");
        setUserRole('user');
      }
    } else {
      setUserRole(null);
      navigate('/forum');
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    fetchUserProfile();
    const { data: { subscription } } = onAuthStateChange((_event, _session) => {
      fetchUserProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Sesión cerrada con éxito.");
      setUser(null);
      setUserRole(null);
      navigate('/forum');
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
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-64 mb-2" />
          <Skeleton className="h-4 w-56" />
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Mi Perfil</h1>
          <p className="text-lg text-foreground mb-12 max-w-xl mx-auto text-balance">
            Aquí puedes ver la información de tu cuenta.
          </p>

          <Card className="p-8 shadow-lg">
            <CardHeader className="flex flex-col items-center">
              <UserIcon className="h-16 w-16 text-primary mb-4" />
              <CardTitle className="text-3xl font-bold text-primary text-balance">{user.email}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-lg text-foreground">
                <Mail className="h-5 w-5" />
                <span>Correo: {user.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-lg text-foreground">
                <Tag className="h-5 w-5" />
                <span>Rol: {userRole}</span>
              </div>
              <div className="pt-6">
                <Button variant="outline" onClick={handleSignOut} className="flex items-center space-x-2 mx-auto">
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default ProfilePage;