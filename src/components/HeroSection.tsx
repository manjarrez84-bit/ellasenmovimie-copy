"use client";

import { Button } from '@/components/ui/button';
import Link from '@/components/Link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.section 
      className="relative h-[80vh] flex flex-col items-center justify-center text-center bg-primary text-primary-foreground w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 p-6 max-w-4xl flex flex-col items-center container mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-balance">
          Empoderando a Mujeres
        </h1>
        <div className="flex space-x-4">
          <Link to="/how-to-help">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Cómo Ayudar
            </Button>
          </Link>
          <Link to="/programs">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Nuestros Programas
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;