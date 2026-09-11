import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import NewsletterForm from '../forms/NewsletterForm';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 dark:bg-black border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        
        {/* La imagen cintilla.png global ha sido eliminada de aquí */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Columna 1: Info y Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-balance">Ellas en Movimiento, A.C.</h3>
            <p className="text-sm mb-4 text-balance">Apoyando a mujeres en situación de violencia y pobreza.</p>
            
            {/* Imagen cintilla.png insertada aquí, debajo del texto */}
            <div className="mb-4">
              <img 
                src="/cintilla.png" 
                alt="Cintilla de apoyo" 
                className="mx-auto w-full h-auto rounded-lg max-w-xs md:max-w-full" 
              />
            </div>

            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity duration-200"><Facebook size={24} /></a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity duration-200"><Instagram size={24} /></a>
              <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity duration-200"><Twitter size={24} /></a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-balance">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline text-balance">Inicio</Link></li>
              <li><Link to="/about" className="hover:underline text-balance">Nosotras</Link></li>
              <li><Link to="/programs" className="hover:underline text-balance">Programas</Link></li>
              <li><Link to="/blog" className="hover:underline text-balance">Blog</Link></li>
              <li><Link to="/forum" className="hover:underline text-balance">Foro</Link></li>
              <li><Link to="/faq" className="hover:underline text-balance">FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline text-balance">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-balance">Suscríbete al Boletín</h3>
            <p className="text-sm mb-4 text-balance">Recibe nuestras últimas noticias y actualizaciones directamente en tu correo.</p>
            <NewsletterForm />
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Ellas en Movimiento, A.C. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;