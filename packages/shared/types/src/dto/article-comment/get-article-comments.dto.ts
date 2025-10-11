export interface IArticleCommentAuthorDto {
  nickname: string;
  profileImage: string;
}

export interface IArticleCommentDto {
  id: string;
  content: string;
  createdAt: Date;
  author: IArticleCommentAuthorDto;
}

export interface IResponseGetArticleCommentsDto {
  comments: IArticleCommentDto[];
}
