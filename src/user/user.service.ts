import { Injectable } from '@nestjs/common';
import { UsersService } from '../database/users/users.service';
import { CreateProfile } from './dto/create-profile-request.dto';
import { UpdateProfile } from './dto/update-profile-request.dto';
import { JoinRequest } from './dto/join-request.dto';
import { Utils } from '../common/utils';
import { User } from '../database/users/entities/user.entity';

class CreateUserDto {}

@Injectable()
export class UserService {
  constructor(private readonly usersService: UsersService) {}
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  async findOne(id: number) {
    return this.usersService.findById(id);
  }

  findById(userId: number) {
    return this.usersService.findById(userId);
  }

  async createProfile(userId: number, profileImage: Express.Multer.File, createProfile: CreateProfile) {
    const user = createProfile.toEntity();
    if (profileImage) {
      user.imgUrl = Utils.getDBFilePath(profileImage);
    }
    await this.usersService.update(userId, user);
    return { success: true };
  }

  /**
   * 프로필 수정
   * @param userId
   * @param profileImage
   * @param updateProfile
   */
  async updateProfile(userId: number, profileImage: Express.Multer.File, updateProfile: UpdateProfile) {
    const user: User = updateProfile.toEntity();
    if (profileImage) {
      user.imgUrl = Utils.getDBFilePath(profileImage);
    }
    await this.usersService.update(userId, user);
    return { success: true };
  }

  /**
   * 회원가입
   * @param join
   */
  async join(join: JoinRequest) {
    return this.usersService.save(join.toEntity());
  }
}
