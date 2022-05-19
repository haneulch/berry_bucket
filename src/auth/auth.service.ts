import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../database/users/users.service';
import { ErrorMessage } from '../common/error-message';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * access token 생성
   * @param userId
   */
  private generateAccessToken(userId: string) {
    const payload = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRE')}s`,
    });
    return { accessToken };
  }

  /**
   * refresh token 생성
   * @param userId
   */
  private generateRefreshToken(userId: string) {
    const refreshPayload = { userId, refresh: true };
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRE')}s`,
    });
    return { refreshToken };
  }

  /**
   * login (토큰 발급)
   * @param userId
   */
  async login(userId: string) {
    const user = await this.usersService.findIdById(userId);
    if (user.length > 0) {
      const { accessToken } = this.generateAccessToken(userId);
      const { refreshToken } = this.generateRefreshToken(userId);
      return { accessToken, refreshToken };
    }
    throw new BadRequestException(ErrorMessage.WRONG_USER);
  }
}
