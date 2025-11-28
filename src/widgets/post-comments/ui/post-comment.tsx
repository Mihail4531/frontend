"use client";
import { MessageSquare, Loader2 } from 'lucide-react';
import { AddCommentForm } from '@/features/add-comment';
import { usePostComments } from '../model/usePostComment';
import { CommentItem } from './comment-item';

export const PostComments = ({ postId }: { postId: number }) => {
  const { comments, commentTree, isLoading, handleAdd, handleDeleteComment } = usePostComments(postId);
  return (
    <div className="mt-20 pt-10 border-t border-white/5" id="comments">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-5 h-5 text-zinc-400" />
        <h3 className="text-xl font-bold text-white">
            Обсуждение <span className="text-zinc-500 ml-1">{comments.length}</span>
        </h3>
      </div>
      <AddCommentForm postId={postId} onCommentAdded={handleAdd} />
      {isLoading && comments.length === 0 ? (
         <div className="flex justify-center py-10"><Loader2 className="animate-spin text-zinc-600" /></div>
      ) : comments.length === 0 ? (
         <p className="text-zinc-600 text-sm text-center py-4">Нет комментариев.</p>
      ) : (
        <div className="space-y-8">
            {commentTree.map((comment) => (
                <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    postId={postId}
                    onReply={handleAdd}
                    onDelete={handleDeleteComment} 
                />
            ))}
        </div>
      )}
    </div>
  );
};