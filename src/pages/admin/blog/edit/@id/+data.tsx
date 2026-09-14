import { getPostById } from '@/services/blogService';

export default async function data(pageContext: { routeParams: { id: string } }) {
  const post = await getPostById(pageContext.routeParams.id);
  return { post };
}
