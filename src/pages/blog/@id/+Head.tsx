import SeoMeta from '@/components/SeoMeta';
import { useData } from 'vike-react/useData';
import type { BlogPost } from '@/types';

export default function Head() {
  const { post } = useData<{ post: BlogPost }>();
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