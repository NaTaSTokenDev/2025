import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost } from './BlogPost';
import type { BlogPost as BlogPostType } from '../types';
import { AlertCircle } from 'lucide-react';

interface BlogListProps {
  isAdmin?: boolean;
}

export function BlogList({ isAdmin }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const postsRef = collection(db, 'blog_posts');
        const q = query(
          postsRef,
          isAdmin ? where('id', '!=', '') : where('is_published', '==', true),
          orderBy('created_at', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure dates are properly converted from Firestore Timestamps
          created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          published_at: doc.data().published_at?.toDate?.()?.toISOString() || null
        })) as BlogPostType[];
        
        setPosts(fetchedPosts);
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        setError(error.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-amber-800">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
        <p className="text-sm mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {posts.map(post => (
        <BlogPost key={post.id} post={post} isPreview />
      ))}
      
      {posts.length === 0 && (
        <p className="text-center text-amber-700 py-12">
          {isAdmin ? 'No posts found. Create your first blog post!' : 'No published posts yet.'}
        </p>
      )}
    </div>
  );
}