import ReactGA from 'react-ga4';

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export const initGA4 = (): void => {
  if (!GA4_MEASUREMENT_ID) {
    console.warn('VITE_GA4_MEASUREMENT_ID no está definida en las variables de entorno.');
    return;
  }

  ReactGA.initialize(GA4_MEASUREMENT_ID);
  console.log('Google Analytics 4 inicializado correctamente.');
};

export const logPageView = (path: string): void => {
  if (!GA4_MEASUREMENT_ID) return;
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const logEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>): void => {
  if (!GA4_MEASUREMENT_ID) return;
  ReactGA.event(eventName, eventParams);
};

export const logDownload = (fileName: string, fileExtension: string): void => {
  logEvent('download', {
    file_name: fileName,
    file_extension: fileExtension,
  });
};

export const logClick = (elementName: string, elementType: string): void => {
  logEvent('click', {
    element_name: elementName,
    element_type: elementType,
  });
};

export const logFormSubmit = (formName: string): void => {
  logEvent('form_submit', {
    form_name: formName,
  });
};