import ReactDOM from 'react-dom/client';
import React from 'react';
import type { PageContext } from './types';
import { ThemeProvider } from '@/components/theme-provider'; // Importar ThemeProvider
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

let root: ReactDOM.Root;

async function onRenderClient(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const page = (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Page {...pageProps} />
        </TooltipProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
  const container = document.getElementById('react-root');
  if (!container) throw new Error('No se encontró el elemento #react-root');

  if (pageContext.is  Hydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }
}

export default onRenderClient;