import { InvalidJwtException } from '@/auth/exception/jwt/invalid-jwt.exception';
import { JwtExpiredException } from '@/auth/exception/jwt/jwt-expired-exception';
import {
  CreateJwtPayload,
  CreateJwtResult,
  DecodedJwtPayload,
  JwtTokenType,
  VerifiedJwtPayload,
} from '@/auth/types/jwt.type';
import { MyConfigService } from '@/config/my-config.service';
import { Injectable } from '@nestjs/common';
import { JwtPayload, TokenExpiredError, decode, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly jwtSecret: string;

  constructor(private readonly myConfigService: MyConfigService) {
    this.jwtSecret = myConfigService.get('JWT_SECRET');
  }

  private getExpiresIn(tokenType: JwtTokenType): number {
    return +this.myConfigService.get(`JWT_${tokenType}_EXPIRE`);
  }

  private isValidJwtPayload(payload: string | JwtPayload): payload is VerifiedJwtPayload {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      'id' in payload &&
      'role' in payload &&
      typeof payload.id === 'string' &&
      typeof payload.role === 'string'
    );
  }

  createJwt(payload: CreateJwtPayload): CreateJwtResult {
    return {
      accessToken: sign(payload, this.jwtSecret, {
        expiresIn: this.getExpiresIn('ACCESS'),
      }),
      refreshToken: sign(payload, this.jwtSecret, {
        expiresIn: this.getExpiresIn('REFRESH'),
      }),
    };
  }

  verifyJwt(token: string): VerifiedJwtPayload {
    try {
      const verifiedJwt = verify(token, this.jwtSecret);

      if (!this.isValidJwtPayload(verifiedJwt)) {
        throw new InvalidJwtException('유효하지 않은 토큰');
      }

      return verifiedJwt;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new JwtExpiredException('만료된 토큰');
      }

      throw error;
    }
  }

  decodeJwt(token: string): DecodedJwtPayload {
    return decode(token) as DecodedJwtPayload;
  }
}
