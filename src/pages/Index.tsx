import { AttributionFooter } from "@/components/AttributionFooter";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import ContactSection from '@/components/ContactSection';
import AnimatedSection from '@/components/AnimatedSection';
import LatestBlogPostsSection from '@/components/LatestBlogPostsSection';
import Link from '@/components/Link';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';

const Index = () => {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Ellas en Movimiento, A.C.",
    "url": "https://ellasenmovimiento.org",
    "description": "Organización sin fines de lucro que empodera a mujeres en situación de violencia y pobreza a través de asesoría legal, apoyo psicológico, talleres productivos y programas educativos.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Porfirio Díaz 426 Nte. Col. Centro",
      "addressLocality": "Monterrey",
      "addressRegion": "Nuevo León",
      "postalCode": "64000",
      "addressCountry": "MX"
    },
    "telephone": "+52-81-8374-1257",
    "email": "contacto@ellasenmovimiento.org",
    "areaServed": "Monterrey, Nuevo León, México",
    "foundingDate": "2008",
    "mission": "Empoderar a mujeres en situación de vulnerabilidad a través de educación, asesoría legal y apoyo psicológico."
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Inicio"
        description="Ellas en Movimiento, A.C. - Apoyando a mujeres en situación de violencia y pobreza. Descubre nuestros programas de empoderamiento, asesoría legal y talleres productivos."
        path="/"
      />
      <JsonLd data={organizationJsonLd} />
      <Header />
      <main className="flex-grow pt-24">
        
        {/* Sección con la imagen introellas22.png (sin sombra ni marco) */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/introellas22.png" 
              alt="Ellas en Movimiento A.C. - Introducción" 
              className="mx-auto w-full h-auto" 
            />
          </div>
        </section>

        {/* Sección de Call to Action movida aquí */}
        <AnimatedSection>
          <CallToActionSection />
        </AnimatedSection>

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

        {/* Sección con la imagen fundadora22.png (sin fondo, marco ni sombra) */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/fundadora22.png" 
              alt="Imagen de la Fundadora" 
              className="mx-auto w-full max-w-4xl h-auto" 
            />
          </div>
        </section>

        <AnimatedSection>
          <LatestBlogPostsSection />
        </AnimatedSection>

        {/* Sección de Alianzas y Certificaciones (movida más arriba) */}
        <AnimatedSection>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-extrabold text-primary mb-10 uppercase text-balance">NUESTRAS ALIANZAS</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
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
                  src="/alian.jpg" 
                  alt="Alianza 3" 
                  className="mx-auto w-3/4 h-auto object-contain" 
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
          <ContactSection />
        </AnimatedSection>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Index;