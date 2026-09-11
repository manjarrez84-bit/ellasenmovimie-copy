import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from '@/components/Link';
import { HandHeart, DollarSign, Users, Facebook, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AttributionFooter } from '@/components/AttributionFooter';
import SEOHead from '@/components/SEOHead';

const HowToHelpPage = () => {
  const shareUrl = window.location.origin;
  const shareText = "Apoya a Ellas en Movimiento, A.C. #EllasEnMovimiento";
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Cómo Ayudar"
        description="Hay muchas maneras de contribuir: haz una donación, sé voluntario o difunde nuestra causa. Tu apoyo es fundamental para Ellas en Movimiento."
        path="/how-to-help"
      />
      <Header />
      <main className="flex-grow">
        <section className="relative py-16 pt-32 bg-muted/30 text-center overflow-hidden">
          <img src="/voluntariado.png" alt="Fondo de voluntariado" className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10" />
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Cómo Puedes Ayudar</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">Tu apoyo es fundamental.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center"><DollarSign className="text-primary mb-4" size={40} /><CardTitle className="text-2xl font-semibold mb-2 text-balance">Haz una Donación</CardTitle></CardHeader>
                <CardContent className="text-foreground text-balance">Cada contribución económica nos permite mantener nuestros programas.<div className="mt-6"><Link to="/donate"><Button>Donar Ahora</Button></Link></div></CardContent>
              </Card>
              <Card className="p-6 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center"><HandHeart className="text-primary mb-4" size={40} /><CardTitle className="text-2xl font-semibold mb-2 text-balance">Sé Voluntario</CardTitle></CardHeader>
                <CardContent className="text-foreground text-balance">Ofrece tu tiempo y tus habilidades.<div className="mt-6"><Link to="/volunteer"><Button>Quiero Ser Voluntario</Button></Link></div></CardContent>
              </Card>
              <Card className="p-6 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center"><Users className="text-primary mb-4" size={40} /><CardTitle className="text-2xl font-semibold mb-2 text-balance">Difunde Nuestra Causa</CardTitle></CardHeader>
                <CardContent className="text-foreground text-balance">Ayúdanos a crear conciencia.<div className="mt-6 flex justify-center space-x-4">
                  <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook"><Button variant="outline" size="icon"><Facebook className="h-5 w-5" /></Button></a>
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Twitter"><Button variant="outline" size="icon"><Twitter className="h-5 w-5" /></Button></a>
                </div></CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default HowToHelpPage;