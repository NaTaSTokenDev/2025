import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Send } from 'lucide-react';

interface CommentFormProps {
  postId: string;
  onSubmit: (content: string) => void;
}

export function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !auth.currentUser) return;

    setSubmitting(true);
    try {
      const commentData = {
        post_id: postId,
        user_id: auth.currentUser.uid,
        content: content.trim(),
        created_at: serverTimestamp(),
        is_approved: true
      };

      await addDoc(collection(db, 'blog_comments'), commentData);
      onSubmit(content);
      setContent('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!auth.currentUser) {
    return (
      <p className="text-center text-amber-700 py-4">
        Please sign in to leave a comment.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        rows={3}
        maxLength={1000}
        required
        disabled={submitting}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors flex items-center disabled:opacity-50"
          disabled={submitting}
        >
          <Send className="w-4 h-4 mr-2" />
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
}