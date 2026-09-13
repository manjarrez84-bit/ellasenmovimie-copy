"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/ContactSection';
import { AttributionFooter } from '@/components/AttributionFooter';
import ContactForm from '@/components/forms/ContactForm';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
            <main className="flex-grow">
              <h1 className="sr-only">Contacto — Ellas en Movimiento, A.C.</h1>
              <ContactSection />
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-primary mb-8 text-balance">Envíanos un Mensaje</h2>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
              Si tienes alguna pregunta, sugerencia o deseas más información, por favor, completa el siguiente formulario.
            </p>
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
              <ContactForm />
            </div>
          </div>
        </section>
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <video src="/movi.mp4" autoPlay loop muted playsInline className="w-full h-auto rounded-lg shadow-xl" aria-label="Video de Ellas en Movimiento">
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        </section>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;