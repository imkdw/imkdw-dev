export const MEMBER_ENDPOINTS = {
  GET_CURRENT_MEMBER: 'members/me',
  FIND_MEMBER: 'members/:memberId',
  GET_MEMBER_STATS: 'members/:memberId/stats',
} as const;
