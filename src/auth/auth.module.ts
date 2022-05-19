import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtStrategy } from '../common/guards/jwt.strategy';
import { JwtRefreshStrategy } from '../common/guards/jwt-refresh.strategy';
import { JwtRefreshAuthGuard } from '../common/guards/jwt-refresh.auth.guard';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtRefreshStrategy, JwtRefreshAuthGuard],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRE')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  exports: [AuthService, JwtAuthGuard, JwtRefreshAuthGuard, JwtModule],
})
export class AuthModule {}
