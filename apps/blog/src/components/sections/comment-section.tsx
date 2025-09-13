'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Textarea,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  useToast,
} from '@imkdw-dev/ui';
import { Heart, Reply, MoreHorizontal, Copy, Edit3, Trash2, Flag, UserX, Send } from 'lucide-react';

// Simple markdown to HTML converter for comments
function parseCommentMarkdown(text: string): string {
  return (
    text
      // Bold text: **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      // Italic text: *text* or _text_
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      // Inline code: `code`
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      // Code blocks: ```language\ncode\n```
      .replace(
        /```(\w*)\n([\s\S]*?)\n```/g,
        '<pre class="bg-muted border rounded-lg p-3 mt-2 mb-2 overflow-x-auto"><code class="text-xs font-mono">$2</code></pre>'
      )
      // Line breaks
      .replace(/\n\n/g, '</p><p class="text-sm leading-relaxed">')
      .replace(/\n/g, '<br>')
  );
}

interface Comment {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  onReply: (username: string, commentId: string) => void;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  depth?: number;
  currentUserId?: string;
}

function CommentItem({
  comment,
  onReply,
  onLike,
  onDelete,
  onEdit,
  depth = 0,
  currentUserId = 'currentuser',
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { toast } = useToast();

  const isOwner = comment.author.username === currentUserId;

  const handleReply = () => {
    onReply(comment.author.username, comment.id);
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  const handleCopyComment = async () => {
    try {
      await navigator.clipboard.writeText(comment.content);
      toast({
        title: '댓글이 복사되었습니다',
        description: '클립보드에 댓글 내용이 저장되었습니다.',
      });
    } catch {
      toast({
        title: '복사 실패',
        description: '댓글 복사에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleReportComment = () => {
    toast({
      title: '신고가 접수되었습니다',
      description: '해당 댓글을 검토하여 조치하겠습니다.',
    });
  };

  const handleDeleteComment = () => {
    onDelete(comment.id);
    toast({
      title: '댓글이 삭제되었습니다',
      description: '댓글이 성공적으로 삭제되었습니다.',
    });
  };

  const handleEditSave = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent.trim());
      toast({
        title: '댓글이 수정되었습니다',
        description: '댓글이 성공적으로 수정되었습니다.',
      });
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleBlockUser = () => {
    toast({
      title: '사용자를 차단했습니다',
      description: `@${comment.author.username}를 차단했습니다.`,
    });
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-6'} animate-fade-in`}>
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted/50 rounded-2xl px-4 py-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              {isEditing && <span className="text-xs text-primary">편집 중</span>}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleEditSave} size="sm" className="h-7 text-xs">
                    저장
                  </Button>
                  <Button onClick={handleEditCancel} variant="outline" size="sm" className="h-7 text-xs">
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: `<p class="text-sm leading-relaxed">${parseCommentMarkdown(comment.content)}</p>`,
                }}
              />
            )}
          </div>

          <div className="flex items-center space-x-4 mt-2 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-auto p-1 text-xs hover:bg-transparent ${
                comment.isLiked ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <Heart className={`w-4 h-4 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment.likes > 0 && comment.likes}
            </Button>

            {/* 답글 버튼은 최상위 댓글(depth 0)에서만 표시 */}
            {depth === 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReply}
                className="h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
              >
                <Reply className="w-4 h-4 mr-1" />
                답글
              </Button>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplies(!showReplies)}
                className="h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
              >
                {showReplies ? '답글 숨기기' : `답글 ${comment.replies.length}개 보기`}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground ml-auto"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleCopyComment}>
                  <Copy className="w-4 h-4 mr-2" />
                  댓글 복사
                </DropdownMenuItem>

                {isOwner ? (
                  <>
                    <DropdownMenuItem onClick={() => setIsEditing(true)} disabled={isEditing}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      댓글 수정
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDeleteComment} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      댓글 삭제
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleReportComment}>
                      <Flag className="w-4 h-4 mr-2" />
                      신고하기
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBlockUser} className="text-destructive">
                      <UserX className="w-4 h-4 mr-2" />
                      사용자 차단
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Replies */}
          {showReplies && comment.replies && (
            <div className="mt-4">
              {comment.replies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  depth={depth + 1}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CommentSectionProps {
  articleId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CommentSection({ articleId }: CommentSectionProps) {
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
          content: '@kimdev 맞아요! 저도 프로젝트에 적용해보고 싶어졌어요.',
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

  const handleLike = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        // Handle replies
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply
            ),
          };
        }
        return comment;
      })
    );
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

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">댓글 {comments.length}개</h3>
        <p className="text-sm text-muted-foreground">이 글에 대한 생각을 댓글로 나눠주세요.</p>
      </div>

      {/* Comment Form */}
      <div className="mb-8">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            {replyingTo && (
              <div className="mb-2 p-2 bg-muted/50 rounded-lg text-sm">
                <span className="text-muted-foreground">답글 작성 중:</span>
                <span className="font-medium ml-1">@{replyingTo.username}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setNewComment('');
                  }}
                  className="ml-2 h-auto p-1 text-xs"
                >
                  취소
                </Button>
              </div>
            )}

            <div className="relative">
              <Textarea
                placeholder={replyingTo ? `@${replyingTo.username}에게 답글 작성...` : '댓글을 작성해주세요...'}
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[80px] pr-12 resize-none"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                size="sm"
                className="absolute bottom-2 right-2 h-8 w-8 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">Cmd/Ctrl + Enter로 빠르게 등록</p>
              <p className="text-xs text-muted-foreground">{newComment.length}/1000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 댓글이 없습니다.</p>
            <p className="text-sm text-muted-foreground mt-1">첫 번째 댓글을 작성해보세요!</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
