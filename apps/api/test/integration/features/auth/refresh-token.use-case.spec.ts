import { RefreshTokenUseCase } from '@/auth/use-case/refresh-token.use-case';
import { JwtService } from '@/auth/service/jwt.service';
import { InvalidJwtException } from '@/auth/exception/jwt/invalid-jwt.exception';
import { JwtExpiredException } from '@/auth/exception/jwt/jwt-expired-exception';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { generateUUID } from '@imkdw-dev/utils';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { MyConfigService } from '@/config/my-config.service';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

describe('토큰 갱신 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: RefreshTokenUseCase;
  let jwtService: JwtService;
  let myConfigService: MyConfigService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([RefreshTokenUseCase, JwtService, MyConfigService, ConfigService]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(RefreshTokenUseCase);
    jwtService = testHelper.getService(JwtService);
    myConfigService = testHelper.getService(MyConfigService);
  });

  describe('만료된 리프레쉬 토큰으로 요청하면', () => {
    it('토큰 만료 예외가 발생한다', async () => {
      const jwtSecret = myConfigService.get('JWT_SECRET');
      const expiredRefreshToken = sign({ id: generateUUID(), role: MEMBER_ROLE.USER }, jwtSecret, {
        expiresIn: '-1s',
      });
      expect(() => sut.execute(expiredRefreshToken)).toThrow(JwtExpiredException);
    });
  });

  describe('비정상적인 토큰으로 요청하면', () => {
    const invalidToken = 'invalid.token.format';
    it('예외가 발생한다', () => {
      expect(() => sut.execute(invalidToken)).toThrow(InvalidJwtException);
    });
  });

  describe('유효한 리프레쉬 토큰으로 요청하면', () => {
    it('새로운 액세스 토큰을 반환한다', () => {
      const validRefreshToken = jwtService.createJwt({ id: generateUUID(), role: MEMBER_ROLE.USER }).refreshToken;
      const newAccessToken = sut.execute(validRefreshToken);
      expect(newAccessToken).toBeDefined();
    });
  });
});
