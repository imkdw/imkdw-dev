export const MEMBER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type MemberRole = (typeof MEMBER_ROLE)[keyof typeof MEMBER_ROLE];

export const MEMBER_MIN_NICKNAME_LENGTH = 2;
export const MEMBER_MAX_NICKNAME_LENGTH = 20;

export const NICKNAME_REGEX = new RegExp(
  `^[가-힣a-zA-Z0-9\\s]{${MEMBER_MIN_NICKNAME_LENGTH},${MEMBER_MAX_NICKNAME_LENGTH}}$`
);
