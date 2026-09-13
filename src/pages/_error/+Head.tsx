import SeoMeta from '@/components/SeoMeta';
import { usePageContext } from 'vike-react/usePageContext';

export default function Head() {
  const { urlPathname } = usePageContext();
  return (
    <SeoMeta
      title="404 - Página No Encontrada"
      description="La página que buscas no existe."
      path={urlPathname}
    />
  );
}