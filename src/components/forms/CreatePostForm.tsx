"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createForumPost } from '@/services/forumService';

const createPostSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres." }).max(100, { message: "El título no debe exceder los 100 caracteres." }),
  content: z.string().min(10, { message: "El contenido debe tener al menos 10 caracteres." }).max(1000, { message: "El contenido no debe exceder los 1000 caracteres." }),
});

type CreatePostValues = z.infer<typeof createPostSchema>;

interface CreatePostFormProps {
  userId: string;
  authorEmail: string;
  onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ userId, authorEmail, onPostCreated }) => {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: CreatePostValues) => {
    try {
      await createForumPost(values.title, values.content, userId, authorEmail);
      toast.success("¡Publicación creada con éxito!");
      form.reset();
      onPostCreated();
    } catch (error: any) {
      console.error("Error al crear la publicación:", error);
      toast.error(error.message || "Ocurrió un error al crear la publicación.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-card rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-primary text-center">Crear Nueva Publicación</h3>
      <div>
        <Label htmlFor="title" className="text-left block mb-2">Título</Label>
        <Input
          id="title"
          type="text"
          placeholder="Título de tu publicación"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="content" className="text-left block mb-2">Contenido</Label>
        <Textarea
          id="content"
          placeholder="Escribe tu mensaje aquí..."
          rows={6}
          {...form.register("content")}
        />
        {form.formState.errors.content && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.content.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Publicando..." : "Publicar"}
      </Button>
    </form>
  );
};

export default CreatePostForm;