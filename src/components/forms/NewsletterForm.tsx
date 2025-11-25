"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const newsletterFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

const NewsletterForm = () => {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    try {
      const { error } = await supabase
        .from('SUBSCRIPTIONS') // Corregido: de 'subscriptions' a 'SUBSCRIPTIONS'
        .insert([{ email: values.email }]);

      if (error) {
        if (error.code === '23505') { // Error de violación de unicidad
          toast.error("Este correo electrónico ya está suscrito.");
        } else {
          throw error;
        }
      } else {
        toast.success("¡Gracias por suscribirte! Te mantendremos al tanto.");
        form.reset();
      }
    } catch (error) {
      console.error("Error al suscribirse:", error);
      toast.error("Ocurrió un error al intentar suscribirte. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
      <div className="relative flex-grow">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          id="newsletter-email"
          type="email"
          placeholder="tu@ejemplo.com"
          className="pl-10"
          {...form.register("email")}
        />
      </div>
      <Button type="submit" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Enviando..." : "Suscribirse"}
      </Button>
      {form.formState.errors.email && (
        <p className="text-destructive text-sm mt-1 sm:absolute sm:bottom-[-20px]">{form.formState.errors.email.message}</p>
      )}
    </form>
  );
};

export default NewsletterForm;