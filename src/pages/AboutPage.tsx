import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import ImpactStatsSection from '@/components/ImpactStatsSection';
import WhoWeAreSection from '@/components/WhoWeAreSection';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        
        <WhoWeAreSection /> {/* Now includes Mision/Vision/Values and starts with "¿Quiénes somos?" */}

        <ImpactStatsSection />

      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default AboutPage;