"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import ImpactStatsSection from '@/components/ImpactStatsSection';
import WhoWeAreSection from '@/components/WhoWeAreSection';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <h1 className="sr-only">Nosotras — Ellas en Movimiento, A.C.</h1>
        <WhoWeAreSection />
        <ImpactStatsSection />
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;