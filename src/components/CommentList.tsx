import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogComment } from '../types';
import { Trash2, Clock } from 'lucide-react';

interface CommentListProps {
  postId: string;
  onDelete?: (commentId: string) => void;
  isAdmin?: boolean;
}

export function CommentList({ postId, onDelete, isAdmin }: CommentListProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, 'blog_comments');
        const q = query(
          commentsRef,
          where('post_id', '==', postId),
          isAdmin ? where('id', '!=', '') : where('is_approved', '==', true),
          orderBy('created_at', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogComment[];
        
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, isAdmin]);

  const handleDelete = async (commentId: string) => {
    try {
      await deleteDoc(doc(db, 'blog_comments', commentId));
      onDelete?.(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="bg-amber-50/50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Clock className="w-4 h-4" />
              <span>{new Date(comment.created_at).toLocaleString()}</span>
            </div>
            {isAdmin && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-600 hover:text-red-700"
                title="Delete comment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-amber-900">{comment.content}</p>
        </div>
      ))}

      {comments.length === 0 && (
        <p className="text-center text-amber-700 py-4">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}