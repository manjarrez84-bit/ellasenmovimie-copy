import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Goal, Heart, Lightbulb } from 'lucide-react';

const WhoWeAreSection = () => {
  return (
    <section className="py-16 pt-28 bg-background">
      <div className="container mx-auto px-4 text-center">
        
        <div className="mx-auto w-full max-w-4xl h-auto mb-8">
          <video 
            src="/quienes4.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-auto object-cover"
            aria-label="Video de presentación de Ellas en Movimiento"
          >
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img src="/IMG-20251015-WA0013.jpg" alt="Mujeres en un taller" className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-6">
            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mission">Misión</TabsTrigger>
                <TabsTrigger value="vision">Visión</TabsTrigger>
                <TabsTrigger value="values">Valores</TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="p-6 bg-muted/50 rounded-b-lg">
                <div className="flex items-start space-x-4">
                  <Goal className="text-primary mt-1" size={24} />
                  <p className="text-foreground text-balance text-left">
                    Visibilizar la problemática de Ellas y ampliar espacios de participación y desarrollo de las mujeres en la vida pública con el fin de lograr avances en su empoderamiento como personas y como ciudadanas.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="vision" className="p-6 bg-muted/50 rounded-b-lg">
                <div className="flex items-start space-x-4">
                  <Lightbulb className="text-primary mt-1" size={24} />
                  <p className="text-foreground text-balance text-left">
                    Ser una fuerza transformadora y generadora de respuestas para un avance significativo en el desarrollo integral de Ellas habiendo logrado su empoderamiento.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="values" className="p-6 bg-muted/50 rounded-b-lg">
                <div className="flex items-start space-x-4">
                  <Heart className="text-primary mt-1" size={24} />
                  <div className="text-foreground text-balance text-left space-y-3">
                    <p>Dignidad</p>
                    <p>Sororidad y solidaridad</p>
                    <p>Empoderamiento</p>
                    <p>Equidad</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-lg text-foreground text-justify text-balance">
            Los objetivos institucionales de Ellas en Movimiento suelen centrarse en la promoción de la igualdad de género y los derechos humanos de las mujeres, niñas y adolescentes, esto incluye la erradicación de la violencia de género, el empoderamiento económico y social, la promoción de la participación ciudadana y política, y el desarrollo de capacidades a través de procesos de aprendizaje de capacitación y sensibilización en temas trascendentes para Ellas. 
          </p>
          <p className="text-lg font-semibold text-primary mb-3 text-balance">
            Y las diversas actividades de sostenibilidad de Ellas en Movimiento van encaminadas a: 
          </p>
          <ul className="list-disc list-inside text-lg text-foreground space-y-2 ml-4">
            <li className="text-balance">Promueven la autonomía económica de las mujeres a través de fondos de ahorro, de transferencia de conocimientos para la elaboración de productos en el potencial mercado de la economía circular amigables con el ambiente.</li>
            <li className="text-balance">Participación en finanzas climáticas y la creación de redes de colaboración para la toma de decisiones ambientales.</li>
            <li className="text-balance">Actividades de desarrollo económico y social</li>
            <li className="text-balance">Economía social: Creación de redes de economía social, como los fondos revolventes para el ahorro colectivo, para generar autonomía financiera.</li>
            <li className="text-balance">Formación y capacitación: Impulsar la capacitación en áreas técnicas y financieras relacionadas con la sostenibilidad, como las finanzas climáticas y los bonos verdes.</li>
            <li className="text-balance">Empoderamiento: Fortalecer el rol de las mujeres en la toma de decisiones, especialmente en asuntos ambientales, a través del diálogo y el intercambio de experiencias.</li>
            <li className="text-balance">Redes de colaboración: Crear y fortalecer redes de sororidad y colaboración para compartir conocimientos, experiencias y apoyos mutuos.</li>
            <li className="text-balance">Actividades de integración</li>
            <li className="text-balance">Participación política: Promover la participación de las mujeres en espacios de toma de decisiones para asegurar que sus voces y necesidades sean tomadas en cuenta en las políticas de desarrollo sostenible.</li>
            <li className="text-balance">Conocimientos ancestrales: Recuperar y utilizar conocimientos ancestrales y saberes locales en la toma de decisiones sobre sostenibilidad y bienestar comunitario.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;