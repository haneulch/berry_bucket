import { Body, Controller, Get, Patch, Post, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResult } from '../dto/login-result.dto';
import { UserId } from '../common/decorators/user-id.decorator';
import { plainToInstance } from 'class-transformer';
import { ProfileResult } from './dto/profile-result.dto';
import { ApiFile } from '../common/decorators/api-file.decorator';
import { CreateProfile } from './dto/create-profile-request.dto';
import { UpdateProfile } from './dto/update-profile-request.dto';
import { JoinRequest } from './dto/join-request.dto';
import { Public } from '../common/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { User } from '../database/users/entities/user.entity';

@ApiTags('유저')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '회원가입' })
  @ApiBadRequestResponse({ description: '중복된 이메일' })
  @Post('join')
  async join(@Body() join: JoinRequest): Promise<LoginResult> {
    const user: User = await this.userService.join(join);
    return this.authService.login(user.id);
  }

  @ApiOperation({ summary: '프로필 조회' })
  @ApiOkResponse({ description: '성공: 프로필 정보' })
  @Get('profile')
  getProfile(@UserId() userId: number): ProfileResult {
    return plainToInstance(ProfileResult, this.userService.findById(userId));
  }

  @ApiOperation({ summary: '프로필 생성' })
  @ApiOkResponse({ description: '성공', type: LoginResult })
  @ApiFile('profileImage', CreateProfile)
  @Post('profile')
  create(
    @UserId() userId: number,
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() createProfile: CreateProfile,
  ) {
    return this.userService.createProfile(userId, profileImage, createProfile);
  }

  @ApiOperation({ summary: '프로필 수정' })
  @ApiFile('profileImage', UpdateProfile)
  @Patch('profile')
  patch(
    @UserId() userId: number,
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() updateProfile: UpdateProfile,
  ) {
    return this.userService.updateProfile(userId, profileImage, updateProfile);
  }
}
