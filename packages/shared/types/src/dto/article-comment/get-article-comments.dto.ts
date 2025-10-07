export interface IArticleCommentAuthorDto {
  nickname: string;
  profileImage: string;
}

export interface IArticleCommentDto {
  id: string;
  content: string;
  createdAt: Date;
  hasReplies: boolean;
  author: IArticleCommentAuthorDto;
}

export interface IResponseGetArticleCommentsDto {
  comments: IArticleCommentDto[];
}
