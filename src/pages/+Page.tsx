"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AttributionFooter } from "@/components/AttributionFooter";
import CallToActionSection from "@/components/CallToActionSection";
import LatestBlogPostsSection from "@/components/LatestBlogPostsSection";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "@/components/Link";
import ContactSection from "@/components/ContactSection";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="sr-only">Ellas en Movimiento, A.C. — Empoderando a mujeres en Monterrey</h1>
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <img src="/introellas22.png" alt="Ellas en Movimiento A.C. - Introducción" className="mx-auto w-full h-auto" />
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <img src="/ellas.gif" alt="Animación Ellas en Movimiento" className="mx-auto w-full max-w-4xl h-auto rounded-lg shadow-lg" />
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <img src="/fundadora22.png" alt="Imagen de la Fundadora" className="mx-auto w-full max-w-4xl h-auto" />
          </div>
        </section>
        <AnimatedSection>
          <LatestBlogPostsSection />
        </AnimatedSection>
        <AnimatedSection>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-extrabold text-primary mb-10 uppercase text-balance">EJES DE ATENCIÓN</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center max-w-full mx-auto">
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
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-extrabold text-primary mb-10 uppercase text-balance">NUESTRAS ALIANZAS</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
                <img src="/ALIANZA.png" alt="Alianza 1" className="mx-auto w-full h-auto object-contain" />
                <img src="/ALIANZA1.png" alt="Alianza 2" className="mx-auto w-full h-auto object-contain" />
                <img src="/alian.jpg" alt="Alianza 3" className="mx-auto w-3/4 h-auto object-contain" />
                <img src="/CERT.png" alt="Certificación" className="mx-auto w-full h-auto object-contain" />
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

export default Page;