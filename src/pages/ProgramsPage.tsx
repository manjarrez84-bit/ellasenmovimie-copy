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
        
        <DetailedProgramsList />

      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default ProgramsPage;