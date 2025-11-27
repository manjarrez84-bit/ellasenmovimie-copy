import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Goal, Heart, Lightbulb } from 'lucide-react';

const WhoWeAreSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        
        {/* Video quienes.mp4 insertado aquí */}
        <div className="mx-auto w-full max-w-4xl h-auto mb-8 rounded-lg shadow-lg overflow-hidden">
          <video 
            src="/quienes.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            controls 
            className="w-full h-auto object-cover"
            aria-label="Video de presentación de Ellas en Movimiento"
          >
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
        
        {/* Contenido de Misión, Visión, Valores */}
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
        {/* Fin del contenido movido */}

        <Card className="max-w-4xl mx-auto p-8 shadow-lg">
          <CardContent className="text-xl text-foreground text-justify space-y-6">
            <p className="text-balance">
              Ellas en Movimiento A.C. es una organización de la sociedad civil sin fines de lucro que trabaja desde hace más de 17 años en el estado de Nuevo León, con el compromiso de mejorar la calidad de vida de mujeres, niñas y sus familias. Nuestra misión es visibilizar la problemática de Ellas y ampliar espacios de participación y desarrollo de las mujeres en la vida pública con el fin de lograr avances en su empoderamiento como personas y como ciudadanas. Nos guía una mirada basada en los derechos humanos, la equidad de género y la sustentabilidad.
            </p>
            <p className="text-balance">
              En Ellas en Movimiento A.C. trabajamos principalmente con mujeres, niñas, niños y adolescentes que habitan en contextos de vulnerabilidad social dentro del estado de Nuevo León, especialmente en zonas urbanas marginadas de Monterrey, como el polígono de pobreza No. 66. Estos grupos enfrentan múltiples carencias que afectan su bienestar, su participación en la vida pública y sus oportunidades de desarrollo.
            </p>
            {/* INSERCIÓN DE LA IMAGEN /12.png - Sombra eliminada, contraste añadido */}
            <img 
              src="/12.png" 
              alt="Imagen de apoyo" 
              className="mx-auto w-full h-auto my-8 rounded-lg brightness-110 contrast-125" 
            />
            {/* FIN DE LA INSERCIÓN */}
            <p className="text-balance">
              Nuestra visión es ser una fuerza transformadora y generadora de respuestas para un avance 
              significativo en el desarrollo integral de Ellas habiendo logrado su empoderamiento. 
            </p>
            <p className="text-balance">
              Trabajamos en alianza con organizaciones, instituciones académicas, sector público y empresas socialmente responsables, para sumar esfuerzos locales a una agenda global, alineando nuestros programas a los Objetivos de Desarrollo Sostenible 2030.
            </p>
            <p className="text-balance">
              Nuestra intervención se enfoca en Ellas porque históricamente han sido excluidas de los espacios donde se toman decisiones y viven situaciones que comprometen su salud, seguridad y acceso a derechos fundamentales.
            </p>
            <p className="text-balance">
              En este contexto, brindar atención integral a estos grupos prioritarios no es solo urgente, sino también esencial para generar condiciones de equidad y justicia social. Al trabajar desde un enfoque comunitario, con programas de empoderamiento, cultura ecológica y educación ambiental, primera infancia y fortalecimiento emocional, oportunidades productivas para Ellas buscamos romper con las barreras estructurales que impiden el ejercicio pleno de sus derechos y su capacidad para transformar sus realidades.
            </p>
            <p className="text-balance">
              Nuestra labor no sustituye al Estado, pero sí complementa esfuerzos públicos con cercanía y pertinencia cultural. Si no se realizan acciones específicas para atender a estas poblaciones, las consecuencias se traducen en una mayor profundización de la desigualdad, reproducción de ciclos intergeneracionales de pobreza, aumento en los niveles de violencia, debilitamiento del tejido social y pérdida de oportunidades para que estas personas construyan un futuro digno y todos compartamos una Casa Común. La falta de atención también conlleva el riesgo de perpetuar la invisibilidad de las mujeres y la normalización de contextos que limitan el desarrollo de la infancia. Por ello, en Ellas en Movimiento A.C. trabajamos con convicción para que las mujeres y sus familias no solo accedan a servicios, sino que también participen activamente en procesos de transformación social y comunitaria. A través de nuestras acciones sostenidas en el tiempo y ancladas en el territorio, buscamos que cada mujer, niña y niño tenga los recursos, el acompañamiento y la confianza necesarios para detonar sus capacidades y avanzar hacia una vida más justa, libre y plena.
            </p>
          </CardContent>
        </Card>
        
        {/* Imagen obje.png insertada aquí */}
        <img src="/obje.png" alt="Objetivos" className="mt-12 mx-auto h-auto rounded-lg" />

        <div className="max-w-4xl mx-auto mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-lg text-foreground text-justify text-balance">
            Los objetivos institucionales de Ellas en Movimiento suelen centrarse en la promoción de la igualdad de género y los derechos humanos de las mujeres, niñas y adolescentes, esto incluye la erradicación de la violencia de género, el empoderamiento económico y social, la promoción de la participación ciudadana y política, y el desarrollo de capacidades a través de procesos de aprendizaje de capacitación y sensibilización en temas trascendentes para Ellas.
          </p>
        </div>

        <img src="/EJES2.png" alt="Ejes de acción" className="mt-12 mx-auto w-full h-auto rounded-lg" />

        {/* Nuevo texto añadido aquí - Cambiando text-justify a text-left */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-muted/50 rounded-lg text-left">
          <p className="text-lg text-foreground mb-4 text-balance">
            Los sujetos de derecho de nuestra Ellas en Movimiento son en femenino, nuestros servicios y programas van encaminados a la atención integral de mujeres niñas, niños y adolescentes. Grupos poblacionales ancestralmente excluidos de la toma de decisiones del desarrollo de México. 
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