"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Heart } from 'lucide-react';

const donationFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState('500');
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (values: DonationFormValues) => {
    const amount = customAmount ? parseFloat(customAmount) : parseInt(selectedAmount, 10);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Por favor, introduce un monto de donación válido.");
      return;
    }

    try {
      const { error } = await supabase
        .from('donations')
        .insert([{ name: values.name, email: values.email, amount }]);

      if (error) throw error;

      setFinalAmount(amount);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error al registrar la donación:", error);
      toast.error("Ocurrió un error al registrar tu donación. Por favor, inténtalo de nuevo.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <Heart className="mx-auto h-12 w-12 text-primary mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">¡Muchas Gracias por tu Apoyo!</h3>
        <p className="text-foreground mb-4">
          Hemos registrado tu intención de donar ${finalAmount.toFixed(2)} MXN. Para completar tu donación, por favor, realiza una transferencia a la siguiente cuenta:
        </p>
        <div className="text-left bg-background p-4 rounded-md">
          <p><strong>Banco:</strong> BBVA México</p>
          <p><strong>A nombre de:</strong> Ellas en Movimiento, A.C.</p>
          <p><strong>CLABE:</strong> 012345678901234567</p>
          <p><strong>Concepto:</strong> Donación {form.getValues("name")}</p>
        </div>
        <Button onClick={() => setIsSubmitted(false)} className="mt-6">Hacer otra donación</Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="amount" className="text-left block mb-2">Monto de la Donación</Label>
        <RadioGroup 
          value={selectedAmount} 
          onValueChange={(value) => {
            setSelectedAmount(value);
            setCustomAmount('');
          }} 
          className="flex flex-wrap justify-center gap-4 mb-4"
        >
          <div className="flex items-center space-x-2"><RadioGroupItem value="100" id="r1" /><Label htmlFor="r1">MXN $100</Label></div>
          <div className="flex items-center space-x-2"><RadioGroupItem value="250" id="r2" /><Label htmlFor="r2">MXN $250</Label></div>
          <div className="flex items-center space-x-2"><RadioGroupItem value="500" id="r3" /><Label htmlFor="r3">MXN $500</Label></div>
          <div className="flex items-center space-x-2"><RadioGroupItem value="1000" id="r4" /><Label htmlFor="r4">MXN $1000</Label></div>
        </RadioGroup>
        <Input 
          id="custom-amount" 
          type="number" 
          placeholder="Otro monto (MXN)" 
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount('');
          }}
        />
      </div>
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
      <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Procesando..." : "Registrar Donación"}
      </Button>
    </form>
  );
};

export default DonationForm;