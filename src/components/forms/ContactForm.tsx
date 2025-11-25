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
import { supabase } from '@/lib/supabase';

// Esquema de validación con Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no debe exceder los 50 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }).max(100, { message: "El asunto no debe exceder los 100 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no debe exceder los 500 caracteres." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: values.name, 
            email: values.email, 
            subject: values.subject, 
            message: values.message 
          }
        ]);

      if (error) {
        throw error;
      }

      toast.success("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
      form.reset(); // Limpiar el formulario después del envío
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error("Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-left block mb-2">Nombre Completo</Label>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email" className="text-left block mb-2">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@ejemplo.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="subject" className="text-left block mb-2">Asunto</Label>
        <Input
          id="subject"
          type="text"
          placeholder="Asunto del mensaje"
          {...form.register("subject")}
        />
        {form.formState.errors.subject && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.subject.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="message" className="text-left block mb-2">Mensaje</Label>
        <Textarea
          id="message"
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </Button>
    </form>
  );
};

export default ContactForm;