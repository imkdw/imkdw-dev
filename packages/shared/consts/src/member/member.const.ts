export const MEMBER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type MemberRole = (typeof MEMBER_ROLE)[keyof typeof MEMBER_ROLE];