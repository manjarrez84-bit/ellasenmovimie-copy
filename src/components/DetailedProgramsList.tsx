import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, HeartHandshake, Home, Leaf, Users, Briefcase } from 'lucide-react';

const detailedPrograms = [
  {
    title: "Fortalecimiento Comunitario",
    description: "Contribuir a la formación de liderazgos colectivos para el mejoramiento del entorno, la distribución de los recursos naturales a su disposición de manera equitativa y trabajar para un desarrollo sustentable y ser una comunidad sostenible con rostro humano.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "REDPARADAHR",
    description: "Distribución de alimentos nutritivos.",
    icon: <Utensils className="h-6 w-6 text-primary" />,
  },
  {
    title: "PROGENDER",
    description: "Gestión de emociones y prevención de violencia de género. Se promueven terapias grupales, con un modelo propio y formación de redes y grupos de apoyo entre mujeres en situación de violencia.",
    icon: <HeartHandshake className="h-6 w-6 text-primary" />,
  },
  {
    title: "Sistema de Cuidados",
    description: "Contribuyendo al reconocimiento de las aportaciones de la economía de cuidados en el PIB del país.",
    icon: <Home className="h-6 w-6 text-primary" />,
  },
  {
    title: "Programa EDUCAM (Educación Ecológica y Cultura Ambiental)",
    description: "Talleres de sensibilización en temas medioambientales para aportar al logro de los ODS para el 2030.",
    icon: <Leaf className="h-6 w-6 text-primary" />,
  },
  {
    title: "Programa de Opciones Productivas para Ellas",
    description: "Se ofrecen talleres de oficios; asesoría de plan de empresa, asistencia técnica, gestión de financiamientos u opciones de créditos blandos.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
];

const DetailedProgramsList = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center text-balance">Programas Específicos</h2>
        
        {/* Imagen PREP.png insertada aquí */}
        <img 
          src="/PREP.png" 
          alt="Programa PREP" 
          className="mx-auto w-full max-w-4xl h-auto mb-8 rounded-lg shadow-lg" 
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {detailedPrograms.map((program, index) => (
            <React.Fragment key={index}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-x-4 p-4 md:p-6">
                  {program.icon}
                  <CardTitle className="text-xl font-semibold text-primary text-balance">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 md:px-6 md:pb-6">
                  <p className="text-foreground text-balance">{program.description}</p>
                </CardContent>
              </Card>
              
              {/* Insertar imagen 2222.png después del primer elemento (REDPARADAHR) */}
              {program.title === "REDPARADAHR" && (
                <img 
                  src="/2222.png" 
                  alt="Imagen de apoyo al programa" 
                  className="mx-auto w-full max-w-4xl h-auto my-8 rounded-lg shadow-lg" 
                />
              )}

              {/* Insertar imagen 1212.png después del segundo elemento (PROGENDER) */}
              {program.title === "PROGENDER" && (
                <img 
                  src="/1212.png" 
                  alt="Imagen de apoyo al programa" 
                  className="mx-auto w-full max-w-4xl h-auto my-8 rounded-lg shadow-lg" 
                />
              )}

              {/* Insertar imagen 1313.png después del tercer elemento (Sistema de Cuidados) */}
              {program.title === "Sistema de Cuidados" && (
                <img 
                  src="/1313.png" 
                  alt="Imagen de apoyo al programa" 
                  className="mx-auto w-full max-w-4xl h-auto my-8 rounded-lg shadow-lg" 
                />
              )}

              {/* Insertar imagen 1414.png después del cuarto elemento (Programa EDUCAM) */}
              {program.title === "Programa EDUCAM (Educación Ecológica y Cultura Ambiental)" && (
                <img 
                  src="/1414.png" 
                  alt="Imagen de apoyo al programa" 
                  className="mx-auto w-full max-w-4xl h-auto my-8 rounded-lg shadow-lg" 
                />
              )}

              {/* Insertar imagen 1515.png después del quinto elemento (Fortalecimiento Comunitario) */}
              {program.title === "Fortalecimiento Comunitario" && (
                <img 
                  src="/1515.png" 
                  alt="Imagen de apoyo al programa" 
                  className="mx-auto w-full max-w-4xl h-auto my-8 rounded-lg shadow-lg" 
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Imagen cintilla.png insertada al final de la sección */}
        <img 
          src="/cintilla.png" 
          alt="Cintilla de apoyo" 
          className="mx-auto w-full max-w-4xl h-auto mt-12 rounded-lg shadow-lg" 
        />
      </div>
    </section>
  );
};

export default DetailedProgramsList;