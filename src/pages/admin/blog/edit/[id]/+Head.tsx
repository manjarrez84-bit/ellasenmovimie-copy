import SeoMeta from '@/components/SeoMeta';
import { useData } from 'vike-react/useData';
import type { BlogPost } from '@/types';

export default function Head() {
  const { post } = useData<{ post: BlogPost }>();
  return (
    <SeoMeta
      title={`Editar: ${post.title}`}
      description={`Edita la publicación "${post.title}"`}
      path={`/admin/blog/edit/${post.id}`}
    />
  );
}