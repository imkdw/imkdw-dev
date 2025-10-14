import { ApiProperty } from '@nestjs/swagger';
import { IMemberDto } from '@imkdw-dev/types';
import { Member } from '@/shared/domain/member/member';
import { MEMBER_ROLE, OAUTH_PROVIDER } from '@imkdw-dev/consts';

export class MemberDto implements IMemberDto {
  private constructor(
    id: string,
    email: string,
    nickname: string,
    profileImage: string,
    role: string,
    provider: string,
    createdAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.profileImage = profileImage;
    this.role = role;
    this.provider = provider;
    this.createdAt = createdAt;
  }

  @ApiProperty({ description: '사용자 ID', example: '12345678-1234-1234-1234-123456789012' })
  id: string;

  @ApiProperty({ description: '이메일', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: '닉네임', example: 'some_nickname' })
  nickname: string;

  @ApiProperty({ description: '프로필 이미지 URL', example: 'https://example.com/profile.jpg' })
  profileImage: string;

  @ApiProperty({ description: '사용자 역할', enum: MEMBER_ROLE })
  role: string;

  @ApiProperty({ description: 'OAuth 제공자', enum: OAUTH_PROVIDER })
  provider: string;

  @ApiProperty({ description: '가입일', example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  static from(member: Member): MemberDto {
    return new MemberDto(
      member.id,
      member.email,
      member.nickname,
      member.profileImage,
      member.role,
      member.provider,
      member.createdAt
    );
  }
}
