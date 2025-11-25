import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MadeWithDyad } from '@/components/made-with-dyad';
import VolunteerForm from '@/components/forms/VolunteerForm';

const VolunteerPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-background text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Sé Parte de Nuestro Equipo de Voluntarios</h1>
            <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
              Tu tiempo y talento son invaluables. Únete a Ellas en Movimiento, A.C. y ayúdanos a construir un futuro mejor para las mujeres.
            </p>

            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary text-balance">Formulario de Voluntariado</CardTitle>
                </CardHeader>
                <CardContent>
                  <VolunteerForm />
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

export default VolunteerPage;