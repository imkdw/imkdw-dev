import { MEMBER_EXCEPTION_CODES } from './member-exception-codes';

type MemberExceptionCode = (typeof MEMBER_EXCEPTION_CODES)[keyof typeof MEMBER_EXCEPTION_CODES];

export const MEMBER_EXCEPTION_MESSAGES: Record<MemberExceptionCode, string> = {
  [MEMBER_EXCEPTION_CODES.MEMBER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
} as const;