import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import type { PageContext } from './types';
import { ThemeProvider } from '@/components/theme-provider'; // Importar ThemeProvider
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

async function onRenderHtml(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;

  const pageHtml = ReactDOMServer.renderToString(
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

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>dyad-generated-app</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add custom pageContext properties here, e.g.:
      // someCustomProperty: 'someValue',
    },
  };
}

export default onRenderHtml;