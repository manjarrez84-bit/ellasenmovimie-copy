import React from 'react';
import { AttributionFooter } from "@/components/AttributionFooter";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import ContactSection from '@/components/ContactSection';
import AnimatedSection from '@/components/AnimatedSection';
import LatestBlogPostsSection from '@/components/LatestBlogPostsSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24"> {/* Aumentado pt-24 para compensar el header fijo */}
        
        {/* Sección con la imagen introellas.png (sin sombra ni marco) */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/introellas.png" 
              alt="Ellas en Movimiento A.C. - Introducción" 
              className="mx-auto w-full h-auto" 
            />
          </div>
        </section>

        {/* Sección con el GIF ellas.gif */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/ellas.gif" 
              alt="Animación Ellas en Movimiento" 
              className="mx-auto w-full max-w-4xl h-auto rounded-lg shadow-lg" 
            />
          </div>
        </section>

        {/* Sección con la imagen fundadora.png (sin fondo, marco ni sombra) */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/fundadora.png" 
              alt="Imagen de la Fundadora" 
              className="mx-auto w-full max-w-4xl h-auto" 
            />
          </div>
        </section>

        <AnimatedSection>
          <LatestBlogPostsSection />
        </AnimatedSection>
        
        {/* Sección de Alianzas y Certificaciones */}
        <AnimatedSection>
          <section className="py-16 bg-background"> {/* Cambiado a bg-background para que los logos con fondo blanco se vean transparentes en modo claro */}
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-extrabold text-primary mb-10 uppercase text-balance">EJES DE ATENCIÓN</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                <img 
                  src="/ALIANZA.png" 
                  alt="Alianza 1" 
                  className="mx-auto w-full h-auto max-h-64 object-contain" 
                />
                <img 
                  src="/ALIANZA1.png" 
                  alt="Alianza 2" 
                  className="mx-auto w-full h-auto max-h-64 object-contain" 
                />
                <img 
                  src="/CERT.png" 
                  alt="Certificación" 
                  className="mx-auto w-full h-auto max-h-64 object-contain" 
                />
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <AnimatedSection>
          <CallToActionSection />
        </AnimatedSection>
        <AnimatedSection>
          <ContactSection />
        </AnimatedSection>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Index;