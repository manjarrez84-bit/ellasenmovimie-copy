import * as z from 'zod';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  image_url: string;
  content: string;
  user_id: string; // Añadido para asociar el post con el usuario
}

export interface ForumPost {
  id: string;
  user_id: string;
  author_email: string;
  title: string;
  content: string;
  created_at: string;
}

// Nueva interfaz para Subscription/Newsletter
export interface Subscription {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Esquema de validación para publicaciones de blog
export const blogPostSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres." }).max(100, { message: "El título no debe exceder los 100 caracteres." }),
  author: z.string().min(2, { message: "El nombre del autor es requerido." }).max(50, { message: "El nombre del autor no debe exceder los 50 caracteres." }),
  summary: z.string().min(20, { message: "El resumen debe tener al menos 20 caracteres." }).max(250, { message: "El resumen no debe exceder los 250 caracteres." }),
  image_url: z.string().url({ message: "Por favor, introduce una URL de imagen válida." }),
  content: z.string().min(50, { message: "El contenido debe tener al menos 50 caracteres." }),
});

// Nueva validación para Subscription (aunque el formulario usa Zod simple)
export const subscriptionSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;