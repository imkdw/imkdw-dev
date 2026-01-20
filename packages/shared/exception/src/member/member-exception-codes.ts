export const MEMBER_EXCEPTION_CODES = {
  // 멤버를 찾을 수 없음
  MEMBER_NOT_FOUND: 'MEMBER-0001',
  // 닉네임이 이미 존재함
  EXIST_MEMBER_NICKNAME: 'MEMBER-0002',
} as const;

type MemberExceptionCode = (typeof MEMBER_EXCEPTION_CODES)[keyof typeof MEMBER_EXCEPTION_CODES];

export const MEMBER_EXCEPTION_MESSAGES_KO: Record<MemberExceptionCode, string> = {
  [MEMBER_EXCEPTION_CODES.MEMBER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
  [MEMBER_EXCEPTION_CODES.EXIST_MEMBER_NICKNAME]: '이미 사용 중인 닉네임입니다.',
} as const;

export const MEMBER_EXCEPTION_MESSAGES_EN: Record<MemberExceptionCode, string> = {
  [MEMBER_EXCEPTION_CODES.MEMBER_NOT_FOUND]: 'User not found.',
  [MEMBER_EXCEPTION_CODES.EXIST_MEMBER_NICKNAME]: 'Nickname is already in use.',
} as const;
