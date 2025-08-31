export interface Member {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}