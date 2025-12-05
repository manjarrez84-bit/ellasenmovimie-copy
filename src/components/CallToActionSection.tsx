import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="py-8 bg-primary text-primary-foreground text-center dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-base md:text-lg font-bold mb-4 max-w-4xl mx-auto text-balance">Tu Apoyo es fundamental para que podamos seguir detonando las capacidades de las niñas y las mujeres. ¡Gracias por creer en nuestra causa y en nuestra gente! ¡Hay muchas maneras de contribuir!</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto text-balance">
          
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