import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HandHeart, DollarSign, Users, Facebook, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AttributionFooter } from '@/components/AttributionFooter';

const HowToHelpPage = () => {
  const shareUrl = window.location.origin;
  const shareText = "Apoya a Ellas en Movimiento, A.C. a empoderar a mujeres y transformar vidas. ¡Tu ayuda hace la diferencia! #EllasEnMovimiento";
  
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative py-16 pt-32 bg-muted/30 text-center overflow-hidden"> {/* Ajustado pt-32 */}
          <img 
            src="/voluntariado.png" 
            alt="Fondo de voluntariado" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10" 
          />
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Cómo Puedes Ayudar</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
              Tu apoyo es fundamental para que Ellas en Movimiento, A.C. pueda seguir detonando las capacidades de las niñas y las mujeres. ¡Gracias por creer en nuestra causa y en nuestra gente! ¡Hay muchas maneras de contribuir!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center">
                  <DollarSign className="text-primary mb-4" size={40} />
                  <CardTitle className="text-2xl font-semibold mb-2 text-balance">Haz una Donación</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground text-balance">
                  Cada contribución económica nos permite mantener nuestros programas y llegar a más mujeres. Tu generosidad hace una diferencia real.
                  <div className="mt-6">
                    <Link to="/donate">
                      <Button>Donar Ahora</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center">
                  <HandHeart className="text-primary mb-4" size={40} />
                  <CardTitle className="text-2xl font-semibold mb-2 text-balance">Sé Voluntario</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground text-balance">
                  Ofrece tu tiempo y tus habilidades para apoyar en nuestros talleres, eventos o en la gestión diaria de la asociación.
                  <div className="mt-6">
                    <Link to="/volunteer">
                      <Button>Quiero Ser Voluntario</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center">
                  <Users className="text-primary mb-4" size={40} />
                  <CardTitle className="text-2xl font-semibold mb-2 text-balance">Difunde Nuestra Causa</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground text-balance">
                  Ayúdanos a crear conciencia sobre la importancia de promover la perspectiva de género en el entorno privado y en el ámbito público. A promover buenas practicar sustentables y una vida sostenible en igualdad de oportunidades.
                  <div className="mt-6 flex justify-center space-x-4">
                    <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook">
                      <Button variant="outline" size="icon">
                        <Facebook className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Twitter">
                      <Button variant="outline" size="icon">
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
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