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

const volunteerFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Por favor, introduce un correo válido." }),
  phone: z.string().optional(),
  skills: z.string().min(10, { message: "Por favor, describe tus habilidades (mínimo 10 caracteres)." }),
  availability: z.string().min(5, { message: "Por favor, indica tu disponibilidad." }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const VolunteerForm = () => {
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "",
    },
  });

  const onSubmit = async (values: VolunteerFormValues) => {
    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .insert([values]);

      if (error) throw error;

      toast.success("¡Solicitud enviada! Gracias por tu interés, te contactaremos pronto.");
      form.reset();
    } catch (error) {
      console.error("Error al enviar la solicitud de voluntariado:", error);
      toast.error("Ocurrió un error al enviar tu solicitud. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-left block mb-2">Nombre Completo</Label>
        <Input id="name" type="text" placeholder="Tu nombre" {...form.register("name")} />
        {form.formState.errors.name && <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email" className="text-left block mb-2">Correo Electrónico</Label>
        <Input id="email" type="email" placeholder="tu@ejemplo.com" {...form.register("email")} />
        {form.formState.errors.email && <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="phone" className="text-left block mb-2">Teléfono (Opcional)</Label>
        <Input id="phone" type="tel" placeholder="+52 55 1234 5678" {...form.register("phone")} />
      </div>
      <div>
        <Label htmlFor="skills" className="text-left block mb-2">Habilidades o Áreas de Interés</Label>
        <Textarea id="skills" placeholder="Ej: Asesoría legal, apoyo psicológico, organización de eventos, diseño gráfico, etc." rows={3} {...form.register("skills")} />
        {form.formState.errors.skills && <p className="text-destructive text-sm mt-1">{form.formState.errors.skills.message}</p>}
      </div>
      <div>
        <Label htmlFor="availability" className="text-left block mb-2">Disponibilidad</Label>
        <Input id="availability" type="text" placeholder="Ej: Lunes y Miércoles por la tarde" {...form.register("availability")} />
        {form.formState.errors.availability && <p className="text-destructive text-sm mt-1">{form.formState.errors.availability.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Enviando..." : "Enviar Solicitud"}
      </Button>
    </form>
  );
};

export default VolunteerForm;