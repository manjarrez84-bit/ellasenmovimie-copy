import SeoMeta from '@/components/SeoMeta';
import { usePageContext } from 'vike-react/usePageContext';

export default function Head() {
  const { post } = usePageContext().pageProps;
  return (
    <SeoMeta
      title={post.title}
      description={post.summary}
      path={`/blog/${post.id}`}
      image={post.image_url}
      type="article"
    />
  );
}