import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const caseImages = [
  { src: '/CASO1.PNG', alt: 'Caso de Estudio 1' },
  { src: '/CASO2.PNG', alt: 'Caso de Estudio 2' },
  { src: '/CASO3.PNG', alt: 'Caso de Estudio 3' },
  { src: '/CASO4.PNG', alt: 'Caso de Estudio 4' },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-10 text-balance">Historias de Éxito</h2>
        <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
          Conoce el impacto real de nuestros programas a través de estos ejemplos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseImages.map((image, index) => (
            <Card key={index} className="overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-xl">
              <CardContent className="p-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;