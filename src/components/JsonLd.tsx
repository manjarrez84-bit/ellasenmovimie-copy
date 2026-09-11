"use client";

import { useEffect } from 'react';

interface JsonLdProps {
  data: object;
}

const JsonLd = ({ data }: JsonLdProps) => {
  useEffect(() => {
    const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const el = document.querySelector('script[type="application/ld+json"][data-dynamic]');
      if (el) el.remove();
    };
  }, [data]);

  return null;
};

export default JsonLd;