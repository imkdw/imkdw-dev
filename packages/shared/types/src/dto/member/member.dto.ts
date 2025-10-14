export interface IMemberDto {
  /**
   * 사용자 ID
   */
  id: string;

  /**
   * 이메일
   */
  email: string;

  /**
   * 닉네임
   */
  nickname: string;

  /**
   * 프로필 이미지 URL
   */
  profileImage: string;

  /**
   * 사용자 역할
   */
  role: string;

  /**
   * OAuth 제공자
   */
  provider: string;

  /**
   * 가입일
   */
  createdAt: Date;
}
