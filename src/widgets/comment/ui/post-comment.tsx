'use client';

import { MessageSquare, Loader2 } from 'lucide-react';
import { AddCommentForm } from '@/features/add-comment';
import { CommentItem } from './comment-item'; 
import { usePostComments } from '../model/useComment';
import { PostCommentsProps } from '../model/comment.interface';

export const PostComments = ({ postId }: PostCommentsProps) => {
  // 👇 1. Достаем функцию handleDeleteComment из хука
  const { 
    comments, 
    commentTree, 
    isLoading, 
    handleOptimisticAdd,
    handleDeleteComment // <--- ВОТ ОНА
  } = usePostComments(postId);

  return (
    <div className="mt-20 pt-10 border-t border-white/5" id="comments">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
            <MessageSquare className="w-5 h-5 text-zinc-400" />
        </div>
        <h3 className="text-xl font-bold text-white">
            Обсуждение <span className="text-zinc-500 text-lg font-normal ml-1">{comments.length}</span>
        </h3>
      </div>

      <AddCommentForm 
        postId={postId} 
        onCommentAdded={handleOptimisticAdd} 
      />

      {isLoading && comments.length === 0 ? (
         <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
         </div>
      ) : comments.length === 0 ? (
         <p className="text-zinc-600 text-sm text-center font-mono py-4">
            Пока нет комментариев. Будьте первым.
         </p>
      ) : (
        <div className="space-y-8">
            {commentTree.map((comment) => (
                <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    postId={postId}
                    onReply={handleOptimisticAdd}
                    // 👇 2. ПЕРЕДАЕМ ФУНКЦИЮ СЮДА
                    onDelete={handleDeleteComment} 
                />
            ))}
        </div>
      )}
    </div>
  );
};