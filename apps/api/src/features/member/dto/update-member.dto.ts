import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { MEMBER_MAX_NICKNAME_LENGTH, MEMBER_MIN_NICKNAME_LENGTH, NICKNAME_REGEX } from '@imkdw-dev/consts';
import { IUpdateMemberDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdateMemberDto implements IUpdateMemberDto {
  @ApiProperty({
    description: '닉네임',
    example: 'newNickname',
    minLength: MEMBER_MIN_NICKNAME_LENGTH,
    maxLength: MEMBER_MAX_NICKNAME_LENGTH,
  })
  @Matches(NICKNAME_REGEX)
  @IsNotEmptyString()
  readonly nickname: string;

  @ApiProperty({ description: '프로필 이미지 URL', example: 'https://cdn.example.com/profile.jpg' })
  @IsNotEmptyString()
  readonly profileImage: string;
}
