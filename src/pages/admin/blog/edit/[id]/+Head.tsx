import SeoMeta from '@/components/SeoMeta';
import { usePageContext } from 'vike-react/usePageContext';
import type { BlogPost } from '@/types';

export default function Head() {
  const pageContext = usePageContext();
  const { post } = pageContext.pageProps as { post: BlogPost }; // @ts-ignore
  return (
    <SeoMeta
      title={`Editar: ${post.title}`}
      description={`Edita la publicación "${post.title}"`}
      path={`/admin/blog/edit/${post.id}`}
    />
  );
}