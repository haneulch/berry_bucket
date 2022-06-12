import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResult } from './dto/login-result.dto';
import { AuthService } from './auth/auth.service';
import { Public } from './common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtRefreshAuthGuard } from './common/guards/jwt-refresh.auth.guard';
import { UserId } from './common/decorators/user-id.decorator';

@ApiTags('Main')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ description: '성공', type: LoginResult })
  @Post('login')
  login(@Body() loginRequest: LoginRequest): Promise<LoginResult> {
    return this.authService.login(loginRequest.userId);
  }

  @Public()
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiOkResponse({ description: '성공', type: LoginResult })
  @ApiHeader({ name: 'token' })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('token/refresh')
  async tokenRefresh(@UserId() userId: number) {
    return await this.authService.login(userId);
  }
}
