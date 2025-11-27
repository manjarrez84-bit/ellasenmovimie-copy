import React from 'react';
import { AttributionFooter } from "@/components/AttributionFooter";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import ContactSection from '@/components/ContactSection';
import AnimatedSection from '@/components/AnimatedSection';
import LatestBlogPostsSection from '@/components/LatestBlogPostsSection';
import { Link } from 'react-router-dom'; // Importar Link

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                <img 
                  src="/ALIANZA.png" 
                  alt="Alianza 1" 
                  className="mx-auto w-full h-auto object-contain" 
                />
                <img 
                  src="/ALIANZA1.png" 
                  alt="Alianza 2" 
                  className="mx-auto w-full h-auto object-contain" 
                />
                <img 
                  src="/CERT.png" 
                  alt="Certificación" 
                  className="mx-auto w-full h-auto object-contain" 
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* NUEVA SECCIÓN DE IMÁGENES (EJES DE ATENCIÓN) */}
        <AnimatedSection>
          <section className="py-16 bg-background"> {/* Fondo cambiado a bg-background (blanco/oscuro) */}
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-extrabold text-primary mb-10 uppercase text-balance">EJES DE ATENCIÓN</h2>
              {/* Se ajusta el contenedor de la cuadrícula para que ocupe más espacio y se reduce el gap */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center max-w-full mx-auto">
                {/* Eje 1 con hipervínculo a la imagen 1515.png */}
                <Link to="/programs#imagen-fortalecimiento-comunitario" className="block hover:opacity-80 transition-opacity duration-200">
                  <img src="/ELL22.png" alt="Eje 1" className="mx-auto w-full h-auto object-contain" />
                </Link>
                <img src="/ELL23.png" alt="Eje 2" className="mx-auto w-full h-auto object-contain" />
                <img src="/ELL24.png" alt="Eje 3" className="mx-auto w-full h-auto object-contain" />
                <img src="/ELL25.png" alt="Eje 4" className="mx-auto w-full h-auto object-contain" />
                <img src="/ELL26.PNG" alt="Eje 5" className="mx-auto w-full h-auto object-contain" />
                <img src="/ELL27.png" alt="Eje 6" className="mx-auto w-full h-auto object-contain" />
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