"use client";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

const SEOHead = ({ title, description, path, image, type = 'website' }: SEOHeadProps) => {
  const location = useLocation();
  const baseUrl = 'https://ellasenmovimiento.org';
  const fullUrl = path ? `${baseUrl}${path}` : baseUrl;
  const ogImage = image || '/logo.png';

  useEffect(() => {
    // Update document title
    document.title = `${title} | Ellas en Movimiento`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property: boolean = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Update page path for tracking if needed
    if (path) {
      window.history.replaceState({}, '', path);
    }
  }, [title, description, fullUrl, ogImage, type, path, location.pathname]);

  return null;
};

export default SEOHead;