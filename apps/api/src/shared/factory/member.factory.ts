import { generateUUID } from '@imkdw-dev/utils';
import { Member } from '@/shared/domain/member/member';
import { MEMBER_ROLE, OAuthProvider } from '@imkdw-dev/consts';

export class MemberFactory {
  private static readonly PROGRAMMING_TERMS = [
    'Async',
    'Lazy',
    'Pure',
    'Cache',
    'Quick',
    'Fast',
    'Smart',
    'Safe',
    'Deep',
    'Clean',
    'Agile',
    'Swift',
    'Bold',
    'Dark',
    'Light',
    'Proxy',
    'Mock',
    'Stub',
    'Flex',
    'Grid',
    'Stack',
    'Queue',
    'Hash',
    'Bin',
    'Hex',
    'Float',
    'Int',
    'Byte',
    'Bit',
    'Net',
    'Web',
    'Edge',
    'Core',
    'Base',
    'Root',
    'Node',
    'Link',
    'Port',
    'Host',
    'Path',
    'File',
    'Data',
    'Code',
    'Func',
    'Var',
    'Let',
    'Try',
    'Null',
    'Auto',
    'Sync',
  ];

  private static readonly NOUNS = [
    'Fox',
    'Bear',
    'Wolf',
    'Lion',
    'Eagle',
    'Hawk',
    'Owl',
    'Crow',
    'Swan',
    'Dove',
    'Bee',
    'Ant',
    'Bug',
    'Fish',
    'Crab',
    'Seal',
    'Deer',
    'Elk',
    'Lynx',
    'Puma',
    'Orca',
    'Shark',
    'Ray',
    'Frog',
    'Toad',
    'Gecko',
    'Storm',
    'Wind',
    'Rain',
    'Snow',
    'Fog',
    'Mist',
    'Star',
    'Moon',
    'Sun',
    'Wave',
    'Tide',
    'Fire',
    'Ice',
    'Frost',
    'Dew',
    'Dawn',
    'Dusk',
    'Echo',
    'Spark',
    'Bolt',
    'Glow',
    'Pearl',
    'Ruby',
  ];

  /**
   * 개발자 기술 블로그용 랜덤 닉네임을 생성합니다.
   *
   * @returns {string} camelCase 형식의 랜덤 닉네임 (예: AsyncPanda1234, LazyFox5678)
   * @description
   * - 형식: 프로그래밍 용어 + 명사 + 4자리 숫자
   * - 길이: 2~20자 제한
   * - 20자 초과시 자동으로 재생성
   *
   * @example
   * const nickname = MemberFactory.generateRandomNickname();
   * // 반환 예시: "AsyncPanda1234", "LazyFox5678"
   */
  private static generateRandomNickname(): string {
    const term = this.PROGRAMMING_TERMS[Math.floor(Math.random() * this.PROGRAMMING_TERMS.length)];
    const noun = this.NOUNS[Math.floor(Math.random() * this.NOUNS.length)];
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    const nickname = `${term}${noun}${randomNumber}`;

    if (nickname.length > 20) {
      return this.generateRandomNickname();
    }

    return nickname;
  }

  static createNew(provider: OAuthProvider, providerId: string, email: string, profileImage: string): Member {
    return Member.create({
      id: generateUUID(),
      email,
      nickname: this.generateRandomNickname(),
      profileImage,
      providerId,
      provider,
      role: MEMBER_ROLE.USER,
      createdAt: new Date(),
    });
  }
}
