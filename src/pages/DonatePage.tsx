import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MadeWithDyad } from '@/components/made-with-dyad';
import DonationForm from '@/components/forms/DonationForm';
import DonationImpact from '@/components/DonationImpact';

const DonatePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-muted/30 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Haz tu Donación</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
              Tu generosidad es la fuerza que impulsa nuestros programas. Cada donación, grande o pequeña, nos ayuda a brindar apoyo vital a mujeres en situación de vulnerabilidad.
            </p>

            <DonationImpact />

            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary text-balance">Elige tu Contribución</CardTitle>
                </CardHeader>
                <CardContent>
                  <DonationForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default DonatePage;