import { supabase } from '@/lib/supabase';
import { BlogPost, BlogPostFormValues } from '@/types';

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }

  return data as BlogPost[];
};

export const getPostById = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching post with id ${id}:`, error.message);
    if (error.code === 'PGRST116') {
      return null;
    }
    return null;
  }

  return data as BlogPost | null;
};

export const createBlogPost = async (post: BlogPostFormValues, userId: string): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([
      {
        title: post.title,
        author: post.author,
        summary: post.summary,
        image_url: post.image_url,
        content: post.content,
        user_id: userId,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw new Error('No se pudo crear la publicación del blog.');
  }

  return data as BlogPost;
};

export const updateBlogPost = async (id: string, post: BlogPostFormValues): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title: post.title,
      author: post.author,
      summary: post.summary,
      image_url: post.image_url,
      content: post.content,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating blog post with id ${id}:`, error);
    throw new Error('No se pudo actualizar la publicación del blog.');
  }

  return data as BlogPost;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting blog post with id ${id}:`, error);
    throw new Error('No se pudo eliminar la publicación del blog.');
  }
};