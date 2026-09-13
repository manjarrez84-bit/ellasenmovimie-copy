"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgramsSection from '@/components/ProgramsSection';
import { AttributionFooter } from '@/components/AttributionFooter';
import DetailedProgramsList from '@/components/DetailedProgramsList';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <h1 className="sr-only">Programas — Ellas en Movimiento, A.C.</h1>
        <ProgramsSection />
        <DetailedProgramsList />
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;