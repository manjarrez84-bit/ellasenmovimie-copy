import { supabase } from '@/lib/supabase';
import { ForumPost } from '@/types';

export const getForumPosts = async (): Promise<ForumPost[]> => {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching forum posts:', error);
    throw new Error('No se pudieron cargar las publicaciones del foro.');
  }

  return data as ForumPost[];
};

export const createForumPost = async (title: string, content: string, userId: string, authorEmail: string): Promise<ForumPost> => {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert([{ title, content, user_id: userId, author_email: authorEmail }])
    .select()
    .single();

  if (error) {
    console.error('Error creating forum post:', error);
    throw new Error('No se pudo crear la publicación del foro.');
  }

  return data as ForumPost;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const onAuthStateChange = (callback: (event: string, session: any | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};