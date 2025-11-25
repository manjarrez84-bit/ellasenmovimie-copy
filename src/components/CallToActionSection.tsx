import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground text-center dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-balance">Tu Apoyo Hace la Diferencia</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto text-balance">
          Cada donación, cada hora de voluntariado, nos permite seguir brindando esperanza y oportunidades a más mujeres.
        </p>
        <div className="flex justify-center">
          <Link to="/donate">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-3">
              Donar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;