"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import ImpactStatsSection from '@/components/ImpactStatsSection';
import WhoWeAreSection from '@/components/WhoWeAreSection';
import SEOHead from '@/components/SEOHead';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Nosotras"
        description="Conoce a Ellas en Movimiento, A.C. - 17 años de trayectoria empoderando a mujeres en Monterrey. Nuestra misión, visión y valores."
        path="/about"
      />
      <Header />
      <main className="flex-grow">
        <WhoWeAreSection />
        <ImpactStatsSection />
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;

export { route };
const route = { route: '/about', title: 'Nosotras' };