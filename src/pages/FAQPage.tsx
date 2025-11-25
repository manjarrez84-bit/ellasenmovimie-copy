import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MadeWithDyad } from '@/components/made-with-dyad';

const FAQPage = () => {
  const faqs = [
    {
      question: "¿Qué tipo de ayuda ofrecen?",
      answer: "Ofrecemos un apoyo integral que incluye asesoría legal gratuita, apoyo psicológico (individual y grupal), talleres de capacitación laboral para la independencia económica, y programas educativos sobre derechos y prevención de la violencia."
    },
    {
      question: "¿Sus servicios tienen algún costo?",
      answer: "No, todos nuestros servicios son completamente gratuitos para las mujeres que los necesitan. Nos financiamos a través de donaciones y el apoyo de voluntarios."
    },
    {
      question: "¿Cómo puedo recibir ayuda de la organización?",
      answer: "Puedes ponerte en contacto con nosotras a través de nuestro formulario de contacto, por correo electrónico o por teléfono. Evaluaremos tu situación de manera confidencial y te orientaremos sobre los pasos a seguir."
    },
    {
      question: "No vivo en Monterrey ¿pueden ayudarme?",
      answer: "Aunque nuestra sede principal está en MTY, ofrecemos algunos servicios de orientación y apoyo de forma remota. Por favor, contáctanos para ver cómo podemos ayudarte en tu caso específico."
    },
    {
      question: "¿Cómo se utilizan las donaciones?",
      answer: "El 100% de las donaciones se destina directamente a nuestros programas: pago de honorarios de especialistas (abogadas, psicólogas), materiales para talleres, apoyo para transporte de las usuarias y mantenimiento de nuestras instalaciones seguras."
    },
    {
      question: "No soy profesional en derecho o psicología, ¿aún puedo ser voluntario?",
      answer: "¡Claro que sí! Hay muchas formas de ayudar. Necesitamos voluntarios para organización de eventos, difusión en redes sociales, apoyo administrativo, impartir talleres de otros oficios y mucho más. Tu tiempo y talento son muy valiosos."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Preguntas Frecuentes</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
              Aquí encontrarás respuestas a las dudas más comunes sobre nuestro trabajo y cómo puedes involucrarte.
            </p>

            <div className="max-w-3xl mx-auto text-left">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold text-balance">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground text-balance">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default FAQPage;