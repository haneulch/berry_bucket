import { Injectable } from '@nestjs/common';
import { UsersService } from '../database/users/users.service';
import { CreateProfile } from './dto/create-profile.dto';
import { Utils } from '../common/utils';
import { User } from '../database/users/entities/user.entity';
import { UpdateProfile } from './dto/update-profile.dto';

class CreateUserDto {}

@Injectable()
export class UserService {
  constructor(private readonly usersService: UsersService) {}
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  async findOne(id: string) {
    return this.usersService.findById(id);
  }

  findById(userId: string) {
    return this.usersService.findById(userId);
  }

  async createProfile(userId: string, profileImage: Express.Multer.File, createProfile: CreateProfile) {
    const { accountType, name, bio } = createProfile;
    const request: User = {
      accountType: accountType.valueOf(),
      name,
      bio,
      ...(profileImage && { imgUrl: `${Utils.getDBFilePath(profileImage)}` }),
    };
    await this.usersService.update(userId, request);
    return { success: true };
  }

  /**
   * 프로필 수정
   * @param userId
   * @param profileImage
   * @param updateProfile
   */
  async updateProfile(userId: string, profileImage: Express.Multer.File, updateProfile: UpdateProfile) {
    const request = { ...updateProfile, ...(profileImage && { imgUrl: `${Utils.getDBFilePath(profileImage)}` }) };
    await this.usersService.update(userId, request);
    return { success: true };
  }
}
