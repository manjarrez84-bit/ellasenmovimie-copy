import SeoMeta from '@/components/SeoMeta';
import JsonLd from '@/components/JsonLd';

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Ellas en Movimiento, A.C.",
  "url": "https://ellasenmovimiento.org",
  "description": "Organización sin fines de lucro que empodera a mujeres en situación de violencia y pobreza a través de asesoría legal, apoyo psicológico, talleres productivos y programas educativos.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Porfirio Díaz 426 Nte. Col. Centro",
    "addressLocality": "Monterrey",
    "addressRegion": "Nuevo León",
    "postalCode": "64000",
    "addressCountry": "MX"
  },
  "telephone": "+52-81-8374-1257",
  "email": "contacto@ellasenmovimiento.org",
  "areaServed": "Monterrey, Nuevo León, México",
  "foundingDate": "2008",
  "mission": "Empoderar a mujeres en situación de vulnerabilidad a través de educación, asesoría legal y apoyo psicológico."
};

export default function Head() {
  return (
    <>
      <SeoMeta
        title="Inicio"
        description="Ellas en Movimiento, A.C. - Apoyando a mujeres en situación de violencia y pobreza. Descubre nuestros programas de empoderamiento, asesoría legal y talleres productivos."
        path="/"
      />
      <JsonLd data={organizationJsonLd} />
    </>
  );
}