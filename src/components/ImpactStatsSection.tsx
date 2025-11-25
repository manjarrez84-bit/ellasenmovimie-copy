import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Users, Award, Heart } from 'lucide-react';

const stats = [
  {
    icon: <Calendar size={40} className="text-primary" />,
    value: "17",
    label: "Años de Servicio"
  },
  {
    icon: <Users size={40} className="text-primary" />,
    value: "Más de 5 mil",
    label: "Mujeres Apoyadas"
  },
  {
    icon: <Award size={40} className="text-primary" />,
    value: "62",
    label: "Talleres Realizados"
  },
  {
    icon: <Heart size={40} className="text-primary" />,
    value: "100%",
    label: "Compromiso"
  }
];

const ImpactStatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-12 text-balance">Nuestro Impacto en Números</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-col items-center">
                {stat.icon}
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-2 text-balance">{stat.value}</p>
                <p className="text-foreground font-semibold text-balance">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;