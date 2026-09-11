"use client";

import { useCallback, useEffect } from 'react';
import { logPageView, logEvent, logDownload, logClick, logFormSubmit } from '@/services/analytics';
import { useLocation } from 'react-router-dom';

/**
 * Hook que rastrea automáticamente las vistas de página en GA4
 * cada vez que la ruta cambia.
 */
export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);
};

/**
 * Hook para rastrear eventos personalizados.
 */
export const useGA4 = () => {
  const trackEvent = useCallback((eventName: string, eventParams?: Record<string, string | number | boolean>) => {
    logEvent(eventName, eventParams);
  }, []);

  const trackPageView = useCallback((path: string) => {
    logPageView(path);
  }, []);

  const trackDownload = useCallback((fileName: string, fileExtension: string) => {
    logDownload(fileName, fileExtension);
  }, []);

  const trackClick = useCallback((elementName: string, elementType: string) => {
    logClick(elementName, elementType);
  }, []);

  const trackFormSubmit = useCallback((formName: string) => {
    logFormSubmit(formName);
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackDownload,
    trackClick,
    trackFormSubmit,
  };
};