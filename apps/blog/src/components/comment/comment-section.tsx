'use client';

import { useState } from 'react';
import { useToast } from '@imkdw-dev/toast';
import type { Comment } from './types';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface Props {
  articleId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CommentSection({ articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: '김개발',
        username: 'kimdev',
        avatar: '/placeholder.svg',
      },
      content:
        'React Server Components에 대한 정말 좋은 글이네요! 특히 **성능 최적화** 부분이 인상적입니다. `useState`와 `useEffect` 훅을 서버에서 사용할 수 없다는 점도 중요하네요.',
      timestamp: '2시간 전',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '2',
          author: {
            name: '이프론트',
            username: 'leefront',
            avatar: '/placeholder.svg',
          },
          content: '맞아요! 저도 프로젝트에 적용해보고 싶어졌어요.',
          timestamp: '1시간 전',
          likes: 5,
          isLiked: true,
        },
      ],
    },
    {
      id: '3',
      author: {
        name: '박풀스택',
        username: 'parkfullstack',
        avatar: '/placeholder.svg',
      },
      content:
        '구현 예제가 정말 실용적이네요! 실제 프로덕션에서 사용할 수 있는 코드들이라 도움이 많이 됩니다.\n\n특히 `async/await` 패턴이 정말 깔끔하네요:\n\n```javascript\nconst post = await db.post.findUnique({\n  where: { id },\n  include: { author: true }\n});\n```\n\n이런 식으로 바로 데이터베이스에 접근할 수 있다니 놀랍습니다!',
      timestamp: '3시간 전',
      likes: 8,
      isLiked: false,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ username: string; commentId: string } | null>(null);
  const { toast } = useToast();

  const handleReply = (username: string, commentId: string) => {
    setReplyingTo({ username, commentId });
    setNewComment(`@${username} `);
  };

  const handleDelete = (commentId: string) => {
    setComments(prevComments =>
      prevComments.filter(comment => {
        if (comment.id === commentId) return false;
        if (comment.replies) {
          comment.replies = comment.replies.filter(reply => reply.id !== commentId);
        }
        return true;
      })
    );
  };

  const handleEdit = (commentId: string, newContent: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: newContent };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => (reply.id === commentId ? { ...reply, content: newContent } : reply)),
          };
        }
        return comment;
      })
    );
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: {
        name: '현재 사용자',
        username: 'currentuser',
        avatar: '/placeholder.svg',
      },
      content: newComment,
      timestamp: '방금 전',
      likes: 0,
      isLiked: false,
    };

    if (replyingTo) {
      // Add as reply
      setComments(prevComments =>
        prevComments.map(comment => {
          if (comment.id === replyingTo.commentId) {
            return {
              ...comment,
              replies: [...(comment.replies ?? []), newCommentObj],
            };
          }
          return comment;
        })
      );
    } else {
      // Add as new comment
      setComments(prevComments => [newCommentObj, ...prevComments]);
    }

    setNewComment('');
    setReplyingTo(null);

    toast({
      title: '댓글이 등록되었습니다',
      description: replyingTo ? '답글이 성공적으로 등록되었습니다.' : '댓글이 성공적으로 등록되었습니다.',
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setNewComment('');
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">댓글 {comments.length}개</h3>
        <p className="text-sm text-muted-foreground">이 글에 대한 생각을 댓글로 나눠주세요.</p>
      </div>

      <CommentForm
        newComment={newComment}
        replyingTo={replyingTo}
        onCommentChange={setNewComment}
        onSubmit={handleSubmitComment}
        onCancelReply={handleCancelReply}
        onKeyPress={handleKeyPress}
      />

      <CommentList comments={comments} onReply={handleReply} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
