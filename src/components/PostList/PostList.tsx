'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../Card/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Post } from '@/types';

interface PostListProps {
  posts: Post[];
  initialCount?: number;
  loadMoreCount?: number;
}

export const PostList: React.FC<PostListProps> = ({ 
  posts, 
  initialCount = 4,
  loadMoreCount = 4 
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && visibleCount < posts.length && !isLoading) {
      setIsLoading(true);
      // Simulate loading delay for smooth animation
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + loadMoreCount, posts.length));
        setIsLoading(false);
      }, 500);
    }
  }, [visibleCount, posts.length, loadMoreCount, isLoading]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '100px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {posts.slice(0, visibleCount).map((post, index) => (
          <div
            key={post.id}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <Card 
              id={post.id}
              title={post.title}
              author={post.author}
              content={post.content}
              image={post.image || '/placeholder.png'}
            />
          </div>
        ))}
      </div>
      
      {/* Load more */}
      <div 
        ref={loadMoreRef} 
        className="flex justify-center py-8"
      >
        {isLoading && (
          <div className="flex items-center space-x-3">
            <Spinner size="lg" className="text-gray-600" />
          </div>
        )}
      </div>
    </>
  );
};