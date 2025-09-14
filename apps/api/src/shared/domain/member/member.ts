import { IMember } from '@imkdw-dev/types';

export class Member implements IMember {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  providerId: string;
  provider: string;
  role: string;

  private constructor(props: Member) {
    this.id = props.id;
    this.email = props.email;
    this.nickname = props.nickname;
    this.profileImage = props.profileImage;
    this.providerId = props.providerId;
    this.provider = props.provider;
    this.role = props.role;
  }

  static create(props: Member): Member {
    return new Member(props);
  }
}
