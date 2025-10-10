import { JwtService } from '@/auth/service/jwt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute(refreshToken: string): string {
    const { id, role } = this.jwtService.verifyJwt(refreshToken);
    return this.jwtService.createJwt({ id, role }).accessToken;
  }
}
