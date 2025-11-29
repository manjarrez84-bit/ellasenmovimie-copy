import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types';

const STATIC_TEST_POST: BlogPost = {
  id: 'static-test-post-1',
  title: 'CIERRE DE TALLERES EN COMUNIDAD 2025',
  date: new Date().toISOString(),
  author: 'Ellas en Movimiento A.C.',
  summary: 'Un resumen de los logros y talleres realizados en la comunidad durante el cierre de 2025.',
  image_url: '',
  content: `
14 Gestiones de alimentos nutritivos, con igual número de distribuciones colectivas de comida sana. 

<div style="text-align: center; margin: 20px 0;">
  <img src="/noti1.jpg" alt="Distribución de alimentos nutritivos" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
</div>

6 Talleres de alimentación nutritiva y vida sana.

<div style="text-align: center; margin: 20px 0;">
  <img src="/noti6.jpg" alt="Talleres de alimentación nutritiva y vida sana" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
</div>

4 Talleres de Crianza Positiva

<div style="text-align: center; margin: 20px 0;">
  <img src="/noti4.jpg" alt="Talleres de Crianza Positiva" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
</div>

1 Taller de autocuidado con cuidadoras.

<div style="text-align: center; margin: 20px 0;">
  <img src="/noti11.jpg" alt="Taller de autocuidado con cuidadoras" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
</div>

Se graduaron 15 mujeres en educación financiera, e igual número de graduadas en los talleres productivos en los ramos de alimentos y productos de higiene y limpieza.

<div style="text-align: center; margin: 20px 0;">
  <img src="/noti15.jpg" alt="Graduadas en educación financiera y talleres productivos" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
</div>

1 Taller de Introducción a las energías renovables usando energía solar. ABC de la técnica. Con 62 niñas y niños beneficiados.
  `,
};

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    // Si hay un error de Supabase, devolvemos solo el post estático para no romper la app
    return [STATIC_TEST_POST];
  }

  // Combinamos los posts de Supabase con el post estático
  const supabasePosts = data as BlogPost[];
  
  // Evitamos duplicados si el post estático ya existe (aunque tiene un ID único)
  const combinedPosts = [STATIC_TEST_POST, ...supabasePosts].filter((post, index, self) => 
    index === self.findIndex((t) => (
      t.id === post.id
    ))
  );

  return combinedPosts;
};

export const getPostById = async (id: string): Promise<BlogPost | null> => {
  if (id === STATIC_TEST_POST.id) {
    return STATIC_TEST_POST;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    if (error.code === 'PGRST116') {
        return null;
    }
    throw new Error('No se pudo cargar la publicación.');
  }

  return data as BlogPost | null;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>, userId: string): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([
      { 
        title: post.title, 
        author: post.author, 
        summary: post.summary, 
        image_url: post.image_url, 
        content: post.content,
        user_id: userId, // Asociar el post al usuario que lo crea
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