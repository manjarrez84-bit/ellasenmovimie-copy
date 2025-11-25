import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const images = [
  { src: '/IMG-20251015-WA0013.jpg', alt: 'Mujeres en un taller de empoderamiento' },
  { src: '/IMG-20251015-WA0014.jpg', alt: 'Voluntaria ayudando en la comunidad' },
  { src: '/voluntariado.png', alt: 'Grupo de voluntarias de Ellas en Movimiento' },
  { src: '/fondo.jpg', alt: 'Evento de la comunidad' },
];

const GallerySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4 text-balance">Nuestra Galería</h2>
        <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
          Un vistazo a los momentos que definen nuestro trabajo y el impacto que logramos juntas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[80vw] p-0 border-0">
                <img src={image.src} alt={image.alt} className="w-full h-auto rounded-lg" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;