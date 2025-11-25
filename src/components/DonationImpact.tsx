import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Paintbrush, HeartHandshake, Scale, Briefcase } from 'lucide-react';

const impactData = [
  {
    amount: "$100 MXN",
    description: "Proporciona materiales para un taller de empoderamiento.",
    icon: <Paintbrush className="h-8 w-8 text-primary" />
  },
  {
    amount: "$250 MXN",
    description: "Cubre el costo de una sesión de terapia psicológica.",
    icon: <HeartHandshake className="h-8 w-8 text-primary" />
  },
  {
    amount: "$500 MXN",
    description: "Financia una asesoría legal completa para una mujer.",
    icon: <Scale className="h-8 w-8 text-primary" />
  },
  {
    amount: "$1000 MXN",
    description: "Apoya la capacitación laboral de una mujer durante un mes.",
    icon: <Briefcase className="h-8 w-8 text-primary" />
  }
];

const DonationImpact = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8 text-balance">Mira el Impacto de tu Donación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactData.map((item, index) => (
          <Card key={index} className="text-center shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-2 text-balance">{item.amount}</p>
              <p className="text-foreground text-balance">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DonationImpact;