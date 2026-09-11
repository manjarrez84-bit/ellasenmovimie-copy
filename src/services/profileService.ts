import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user'; // Definimos los roles posibles
}

/**
 * Obtiene el perfil del usuario actual, incluyendo su rol.
 * Asume que existe una tabla 'profiles' con una columna 'role'.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = No rows found
    console.error('Error fetching user profile:', error);
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || '',
    role: profileData?.role || 'user', // Por defecto, si no hay perfil o rol, es 'user'
  };
};