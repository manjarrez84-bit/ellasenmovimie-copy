import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgramsSection from '@/components/ProgramsSection';
import { AttributionFooter } from '@/components/AttributionFooter';
import DetailedProgramsList from '@/components/DetailedProgramsList';

const ProgramsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ProgramsSection />
        
        {/* Sección de Video 20.mp4 */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <video 
              src="/20.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto rounded-lg shadow-xl"
              aria-label="Video de los programas de Ellas en Movimiento"
            >
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        </section>
        
        <DetailedProgramsList />

      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default ProgramsPage;