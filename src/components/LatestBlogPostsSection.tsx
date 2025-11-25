"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPosts } from '@/services/blogService';
import { BlogPost } from '@/types';
import BlogPostCard from '@/components/BlogPostCard';

const LatestBlogPostsSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getAllPosts();
        // Tomar solo las 3 publicaciones más recientes
        setPosts(fetchedPosts.slice(0, 3)); 
      } catch (err) {
        console.error("Error fetching latest blog posts:", err);
        setError('No se pudieron cargar las últimas publicaciones del blog.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    ))
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4 text-balance">Últimas Noticias</h2>
        <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-balance">
          Mantente informada con nuestras publicaciones más recientes.
        </p>

        {error && <p className="text-center text-destructive mb-8">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? renderSkeletons() : posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12">
          <Link to="/blog">
            <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              Ver Todas las Publicaciones
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPostsSection;