"use client";

import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AttributionFooter } from "@/components/AttributionFooter";
import SEOHead from "@/components/SEOHead";
import Link from "@/components/Link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const pageContext = usePageContext();

  useEffect(() => {
    document.title = "404 - Página No Encontrada | Ellas en Movimiento";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="404 - Página No Encontrada"
        description="La página que buscas no existe."
        path={pageContext.urlPathname}
      />
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4 text-balance">404</h1>
          <p className="text-xl text-foreground mb-8 text-balance">Oops! Página no encontrada</p>
          <Link to="/">
            <Button>Volver al Inicio</Button>
          </Link>
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;
