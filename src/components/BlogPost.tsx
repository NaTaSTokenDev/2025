import React from 'react';
import { BlogPost as BlogPostType } from '../types';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
  isPreview?: boolean;
}

export function BlogPost({ post, isPreview }: BlogPostProps) {
  const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="prose prose-amber lg:prose-lg max-w-none">
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}
      
      <h1 className="text-3xl font-bold text-amber-900 mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-6 text-amber-700 mb-8">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {!post.is_published && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
            Draft
          </span>
        )}
      </div>

      {isPreview ? (
        <div className="mb-6">
          <p className="text-amber-800">{post.excerpt}</p>
          <a
            href={`/blog/${post.slug}`}
            className="inline-block mt-4 text-amber-600 hover:text-amber-700"
          >
            Read more →
          </a>
        </div>
      ) : (
        <div
          className="prose prose-amber lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </article>
  );
}