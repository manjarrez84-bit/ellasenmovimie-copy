"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AttributionFooter } from '@/components/AttributionFooter';
import VolunteerForm from '@/components/forms/VolunteerForm';
import SEOHead from '@/components/SEOHead';
import { usePageContext } from 'vike-react/usePageContext';

const Page = () => {
  const { urlPathname } = usePageContext();

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Voluntariado"
        description="Sé parte de nuestro equipo de voluntarios en Ellas en Movimiento. Tu tiempo y talento son invaluables para empoderar a más mujeres."
        path="/volunteer"
      />
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-background text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Sé Parte de Nuestro Equipo de Voluntarios</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">Tu tiempo y talento son invaluables.</p>
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
              <Card><CardHeader><CardTitle className="text-2xl font-semibold text-primary text-balance">Formulario de Voluntariado</CardTitle></CardHeader><CardContent><VolunteerForm /></CardContent></Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;