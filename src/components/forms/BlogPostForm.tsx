"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createBlogPost, updateBlogPost } from '@/services/blogService';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types';

const blogPostSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres." }).max(100, { message: "El título no debe exceder los 100 caracteres." }),
  author: z.string().min(2, { message: "El nombre del autor es requerido." }).max(50, { message: "El nombre del autor no debe exceder los 50 caracteres." }),
  summary: z.string().min(20, { message: "El resumen debe tener al menos 20 caracteres." }).max(250, { message: "El resumen no debe exceder los 250 caracteres." }),
  image_url: z.string().url({ message: "Por favor, introduce una URL de imagen válida." }),
  content: z.string().min(50, { message: "El contenido debe tener al menos 50 caracteres." }),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  userId: string;
  authorEmail: string;
  initialData?: BlogPost; // Prop opcional para precargar datos en modo edición
  onSubmissionSuccess?: () => void; // Callback para cuando la publicación es exitosa
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ userId, authorEmail, initialData, onSubmissionSuccess }) => {
  const navigate = useNavigate();
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      author: authorEmail,
      summary: "",
      image_url: "",
      content: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        author: initialData.author,
        summary: initialData.summary,
        image_url: initialData.image_url,
        content: initialData.content,
      });
    } else {
      // Asegurarse de que el autor se pre-rellene correctamente al crear
      form.setValue("author", authorEmail);
    }
  }, [initialData, authorEmail, form]);

  const onSubmit = async (values: BlogPostFormValues) => {
    try {
      if (initialData) {
        // Modo edición
        await updateBlogPost(initialData.id, values);
        toast.success("¡Publicación de blog actualizada con éxito!");
      } else {
        // Modo creación
        await createBlogPost(values, userId);
        toast.success("¡Publicación de blog creada con éxito!");
        form.reset({
          title: "",
          author: authorEmail,
          summary: "",
          image_url: "",
          content: "",
        });
      }
      onSubmissionSuccess?.(); // Ejecutar callback si existe
      navigate('/blog'); // Redirigir al blog después de crear/actualizar el post
    } catch (error: any) {
      console.error("Error al procesar la publicación del blog:", error);
      toast.error(error.message || "Ocurrió un error al procesar la publicación.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-card rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-primary text-center">
        {initialData ? "Editar Publicación de Blog" : "Crear Nueva Publicación de Blog"}
      </h3>
      <div>
        <Label htmlFor="title" className="text-left block mb-2">Título</Label>
        <Input
          id="title"
          type="text"
          placeholder="Título de la publicación"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="author" className="text-left block mb-2">Autor</Label>
        <Input
          id="author"
          type="text"
          placeholder="Nombre del autor"
          {...form.register("author")}
          disabled // Author is pre-filled and should not be changed by user
        />
        {form.formState.errors.author && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.author.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="summary" className="text-left block mb-2">Resumen</Label>
        <Textarea
          id="summary"
          placeholder="Un breve resumen de la publicación..."
          rows={3}
          {...form.register("summary")}
        />
        {form.formState.errors.summary && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.summary.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="image_url" className="text-left block mb-2">URL de la Imagen Principal</Label>
        <Input
          id="image_url"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          {...form.register("image_url")}
        />
        {form.formState.errors.image_url && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.image_url.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="content" className="text-left block mb-2">Contenido (Markdown)</Label>
        <Textarea
          id="content"
          placeholder="Escribe el contenido de tu publicación aquí (puedes usar Markdown)..."
          rows={10}
          {...form.register("content")}
        />
        {form.formState.errors.content && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.content.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (initialData ? "Actualizando..." : "Publicando...") : (initialData ? "Actualizar Publicación" : "Publicar Blog Post")}
      </Button>
    </form>
  );
};

export default BlogPostForm;