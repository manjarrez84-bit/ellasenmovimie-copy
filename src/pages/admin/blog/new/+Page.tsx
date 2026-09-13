"use client";

import { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AttributionFooter } from '@/components/AttributionFooter';
import BlogPostForm from '@/components/forms/BlogPostForm';
import { getCurrentUser } from '@/services/forumService';
import { getUserProfile } from '@/services/profileService';

const Page = () => {
  const pageContext = usePageContext();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        pageContext.router.navigate('/');
        return;
      }
      const profile = await getUserProfile(user.id);
      if (!profile || profile.role !== 'admin') {
        pageContext.router.navigate('/');
        return;
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-primary mb-8 text-balance">Crear Nueva Publicación</h1>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <BlogPostForm
              userId=""
              authorEmail=""
              onSubmissionSuccess={() => {}}
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