import { getPostById } from '@/services/blogService';
import type { BlogPost } from '@/types';

export default async function data(pageContext: { routeParams: { id: string } }) {
  const post = await getPostById(pageContext.routeParams.id);
  return { post };
}