import { MemberDto } from '@/features/member/dto/member.dto';
import { Member } from '@/shared/domain/member/member';

describe('MemberDto', () => {
  describe('from 메서드', () => {
    it('Member 도메인 객체를 MemberDto로 변환한다', () => {
      // Given
      const memberData = {
        id: 'test-id',
        email: 'test@example.com',
        nickname: 'testuser',
        profileImage: 'https://example.com/profile.jpg',
        providerId: 'google-123',
        provider: 'google',
        role: 'USER',
      };
      const member = Member.create(memberData);

      // When
      const result = MemberDto.from(member);

      // Then
      expect(result).toBeInstanceOf(MemberDto);
      expect(result.id).toBe(member.id);
      expect(result.email).toBe(member.email);
      expect(result.profileImage).toBe(member.profileImage);
      expect(result.role).toBe(member.role);
      expect(result.provider).toBe(member.provider);
    });

    it('profileImage가 null인 경우를 처리한다', () => {
      // Given
      const memberData = {
        id: 'test-id',
        email: 'test@example.com',
        nickname: 'testuser',
        profileImage: null,
        providerId: 'google-123',
        provider: 'google',
        role: 'USER',
      };
      const member = Member.create(memberData);

      // When
      const result = MemberDto.from(member);

      // Then
      expect(result.profileImage).toBeNull();
    });
  });
});