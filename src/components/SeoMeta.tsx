import React from 'react';

type SeoMetaProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

const SITE_NAME = 'Ellas en Movimiento';
const BASE_URL = 'https://ellasenmovimiento.org';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

export default function SeoMeta({ title, description, path, image, type = 'website' }: SeoMetaProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  // Siempre absoluta: si 'image' viene relativa (ej. "/blog/foto.jpg"), la convierte
  const ogImage = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : DEFAULT_IMAGE;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </>
  );
}