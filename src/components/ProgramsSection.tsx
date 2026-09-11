import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Handshake, Shield, Briefcase } from 'lucide-react';

const ProgramsSection = () => {
  const programs = [
    {
      icon: <Shield size={40} className="text-primary mb-4" />,
      title: "Asesoría en gestión de trámites legales",
      description: "Ofrecemos orientación y acompañamiento legal gratuito en casos de violencia de género y derechos civiles."
    },
    {
      icon: <Handshake size={40} className="text-primary mb-4" />,
      title: "Gestión de Emociones y apoyo psicológico",
      description: "Brindamos terapias de gestión de emociones para la sanación personal y grupal y terapias grupales a través de talleres y encuentros para el fortalecimiento de la autoestima."
    },
    {
      icon: <Briefcase size={40} className="text-primary mb-4" />,
      title: "Capacitación en oficios productivos y plan de empresa",
      description: "Programas de formación y talleres para el desarrollo de habilidades laborales y financieras que faciliten la inserción laboral o el emprendimiento productivo."
    },
    {
      icon: <BookOpen size={40} className="text-primary mb-4" />,
      title: "Educación y Sensibilización",
      description: "Talleres y charlas sobre derechos de las mujeres, prevención de la violencia y empoderamiento."
    }
  ];

  return (
    <section className="py-16 pt-24 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-12 text-balance">Nuestros Programas</h2>
        <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
          Trabajamos en diversas áreas para ofrecer un apoyo integral a las mujeres, adaptándonos a sus necesidades específicas.
        </p>

        <div className="container mx-auto px-4 text-center max-w-4xl mb-12">
            <video 
              src="/20.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto rounded-lg"
              aria-label="Video de los programas de Ellas en Movimiento"
            >
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>

        <div className="max-w-4xl mx-auto mb-12 p-6 bg-background rounded-lg shadow-md text-left">
          <p className="text-lg text-foreground text-justify text-balance">
            Nuestros programas están diseñados para abordar los tres pilares esenciales que toda mujer debe proteger: 
            <span className="font-bold text-primary"> vida, salud y autosuficiencia para un retiro digno.</span>
            <br />
            Por ello trabajamos para contribuir a mejorar la realidad de niñas y mujeres en contextos de vulnerabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <CardHeader className="flex flex-col items-center">
                {program.icon}
                <CardTitle className="text-xl font-semibold mb-2 text-balance">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground text-balance">
                {program.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;