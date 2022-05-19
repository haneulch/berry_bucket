import { Body, Controller, Get, Patch, Post, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LoginResult } from '../dto/login-result.dto';
import { UserId } from '../common/decorators/user-id.decorator';
import { plainToInstance } from 'class-transformer';
import { ProfileResult } from './dto/profile-result.dto';
import { ApiFile } from '../common/decorators/api-file.decorator';
import { CreateProfile } from './dto/create-profile.dto';
import { UpdateProfile } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '프로필 조회' })
  @ApiOkResponse({ description: '성공: 프로필 정보' })
  @Get('profile')
  getProfile(@UserId() userId: string): ProfileResult {
    return plainToInstance(ProfileResult, this.userService.findById(userId));
  }

  @ApiOperation({ summary: '프로필 생성' })
  @ApiOkResponse({ description: '성공', type: LoginResult })
  @ApiFile('profileImage', CreateProfile)
  @Post('profile')
  create(
    @UserId() userId: string,
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() createProfile: CreateProfile,
  ) {
    return this.userService.createProfile(userId, profileImage, createProfile);
  }

  @ApiOperation({ summary: '프로필 수정' })
  @ApiFile('profileImage', UpdateProfile)
  @Patch('profile')
  patch(
    @UserId() userId: string,
    @UploadedFile() profileImage: Express.Multer.File,
    @Body() updateProfile: UpdateProfile,
  ) {
    return this.userService.updateProfile(userId, profileImage, updateProfile);
  }
}
