"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgramsSection from '@/components/ProgramsSection';
import { AttributionFooter } from '@/components/AttributionFooter';
import DetailedProgramsList from '@/components/DetailedProgramsList';
import SEOHead from '@/components/SEOHead';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Programas"
        description="Conoce nuestros programas: asesoría legal, apoyo psicológico, capacitación laboral, educación y sensibilización para mujeres en Monterrey."
        path="/programs"
      />
      <Header />
      <main className="flex-grow">
        <ProgramsSection />
        <DetailedProgramsList />
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;

export { route };
const route = { route: '/programs', title: 'Programas' };