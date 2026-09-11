"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createBlogPost, updateBlogPost } from '@/services/blogService';
import { usePageContext } from 'vike-react/usePageContext';
import { BlogPost, blogPostSchema, BlogPostFormValues } from '@/types';

interface BlogPostFormProps {
  userId: string;
  authorEmail: string;
  initialData?: BlogPost;
  onSubmissionSuccess?: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ userId, authorEmail, initialData, onSubmissionSuccess }) => {
  const pageContext = usePageContext() as any;
  const navigate = pageContext.router.navigate;
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
      form.setValue("author", authorEmail);
    }
  }, [initialData, authorEmail, form]);

  const onSubmit = async (values: BlogPostFormValues) => {
    try {
      if (initialData) {
        await updateBlogPost(initialData.id, values);
        toast.success("¡Publicación de blog actualizada con éxito!");
      } else {
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
      onSubmissionSuccess?.();
      navigate('/blog');
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
          disabled
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