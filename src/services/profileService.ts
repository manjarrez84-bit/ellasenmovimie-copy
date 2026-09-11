import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

/**
 * Obtiene el perfil del usuario actual, incluyendo su rol.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
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
    role: profileData?.role || 'user',
  };
};

/**
 * Asigna rol admin al primer usuario registrado (auto-registro admin).
 * Retorna true si el usuario fue promovido a admin.
 */
export const autoAssignAdminRole = async (userId: string): Promise<boolean> => {
  try {
    // Verificar si ya existe algún usuario admin
    const { data: existingAdmins } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    // Si no hay admins, asignar rol admin a este usuario
    if (!existingAdmins || existingAdmins.length === 0) {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: userId, role: 'admin', email: '' });

      if (error) {
        console.error('Error assigning admin role:', error);
        return false;
      }

      console.log('Admin role auto-assigned to user:', userId);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in autoAssignAdminRole:', error);
    return false;
  }
};

/**
 * Crea o actualiza el perfil de un usuario.
 */
export const upsertUserProfile = async (userId: string, email: string, role: 'admin' | 'user' = 'user'): Promise<void> => {
  try {
    await supabase
      .from('profiles')
      .upsert({ id: userId, email, role });
  } catch (error) {
    console.error('Error upserting user profile:', error);
  }
};

/**
 * Obtiene todos los perfiles de usuarios (solo admin).
 */
export const getAllUserProfiles = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('email', { ascending: true });

  if (error) {
    console.error('Error fetching user profiles:', error);
    return [];
  }

  return data as UserProfile[];
};

/**
 * Actualiza el rol de un usuario (solo admin).
 */
export const updateUserRole = async (userId: string, role: 'admin' | 'user'): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

/**
 * Elimina el perfil de un usuario.
 */
export const deleteUserProfile = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
};