import { SetMetadata } from '@nestjs/common';
import { MemberRole } from '@imkdw-dev/consts';

export const MEMBER_ROLES_KEY = 'roles';
export const MemberRoles = (...roles: MemberRole[]) => SetMetadata(MEMBER_ROLES_KEY, roles);
