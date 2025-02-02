import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogFormData } from '../types';
import { Save, X } from 'lucide-react';
import { slugify } from '../utils/helpers';

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => void;
  onCancel: () => void;
  initialData?: Partial<BlogFormData>;
}

export function BlogForm({ onSubmit, onCancel, initialData }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
    featured_image: initialData?.featured_image || '',
    is_published: initialData?.is_published || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = slugify(formData.title);
      const blogPostData = {
        ...formData,
        slug,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        published_at: formData.is_published ? serverTimestamp() : null
      };

      await addDoc(collection(db, 'blog_posts'), blogPostData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-amber-900">Title</label>
        <input
          type="text"
          required
          maxLength={200}
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Excerpt</label>
        <textarea
          required
          maxLength={500}
          value={formData.excerpt}
          onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Content</label>
        <textarea
          required
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Featured Image URL</label>
        <input
          type="url"
          value={formData.featured_image || ''}
          onChange={e => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Meta Title (SEO)</label>
        <input
          type="text"
          maxLength={60}
          value={formData.meta_title || ''}
          onChange={e => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
        <p className="mt-1 text-sm text-amber-600">
          {formData.meta_title?.length || 0}/60 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900">Meta Description (SEO)</label>
        <textarea
          maxLength={160}
          value={formData.meta_description || ''}
          onChange={e => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={2}
        />
        <p className="mt-1 text-sm text-amber-600">
          {formData.meta_description?.length || 0}/160 characters
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_published"
          checked={formData.is_published}
          onChange={e => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
          className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
        />
        <label htmlFor="is_published" className="ml-2 text-sm text-amber-900">
          Publish immediately
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-amber-700 hover:text-amber-800 flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Post
        </button>
      </div>
    </form>
  );
}