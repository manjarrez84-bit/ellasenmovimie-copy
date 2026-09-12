"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AttributionFooter } from '@/components/AttributionFooter';
import SEOHead from '@/components/SEOHead';

const Page = () => {
  const faqs = [
    { question: "¿Qué tipo de ayuda ofrecen?", answer: "Ofrecemos un apoyo integral que incluye asesoría legal gratuita, apoyo psicológico, talleres de capacitación laboral, y programas educativos sobre derechos y prevención de la violencia." },
    { question: "¿Sus servicios tienen algún costo?", answer: "No, todos nuestros servicios son completamente gratuitos para las mujeres que los necesitan." },
    { question: "¿Cómo puedo recibir ayuda de la organización?", answer: "Puedes ponerte en contacto con nosotras a través de nuestro formulario de contacto, por correo electrónico o por teléfono." },
    { question: "No vivo en Monterrey ¿pueden ayudarme?", answer: "Aunque nuestra sede principal está en MTY, ofrecemos algunos servicios de orientación y apoyo de forma remota." },
    { question: "¿Cómo se utilizan las donaciones?", answer: "El 100% de las donaciones se destina directamente a nuestros programas: pago de honorarios de especialistas, materiales para talleres, apoyo para transporte y mantenimiento de instalaciones." },
    { question: "No soy profesional en derecho o psicología, ¿aún puedo ser voluntario?", answer: "¡Claro que sí! Hay muchas formas de ayudar. Tu tiempo y talento son muy valiosos." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Preguntas Frecuentes"
        description="Respuestas a las preguntas más frecuentes sobre Ellas en Movimiento, A.C. Servicios gratuitos, donaciones, voluntariado y más."
        path="/faq"
      />
      <Header />
      <main className="flex-grow">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Preguntas Frecuentes</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">Aquí encontrarás respuestas a las dudas más comunes.</p>
            <div className="max-w-3xl mx-auto text-left">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold text-balance">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground text-balance">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;