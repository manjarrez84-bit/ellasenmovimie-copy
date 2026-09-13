"use client";

import { useState, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import BlogPostForm from '@/components/forms/BlogPostForm';
import { getPostById } from '@/services/blogService';
import { getCurrentUser } from '@/services/forumService';
import { getUserProfile } from '@/services/profileService';
import { BlogPost } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import SEOHead from '@/components/SEOHead';
import { useRouter } from 'vike-react/useRouter';

const Page = () => {
  const pageContext = usePageContext();
  const router = useRouter();
  const id = pageContext.routeParams.id;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/');
        return;
      }
      const profile = await getUserProfile(user.id);
      if (!profile || profile.role !== 'admin') {
        router.push('/');
        return;
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostById(id as string);
        setPost(fetchedPost);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <Skeleton className="h-[500px] rounded-lg" />
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">Publicación no encontrada</h1>
            <p className="text-lg text-foreground mb-8 text-balance">Lo sentimos, no pudimos encontrar la publicación que estás buscando.</p>
          </div>
        </main>
        <Footer />
        <AttributionFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead title={`Editar: ${post.title}`} description={`Edita la publicación "${post.title}"`} path={`/admin/blog/edit/${post.id}`} />
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Editar Publicación</h1>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <BlogPostForm
              userId={post.user_id}
              authorEmail={post.author}
              initialData={post}
            />
          </div>
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default Page;