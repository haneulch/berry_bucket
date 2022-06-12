import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { User } from '../../database/users/entities/user.entity';

export class UpdateProfile {
  @ApiPropertyOptional({ description: '이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'bio' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ description: '프로필 이미지', type: 'string', format: 'binary' })
  @IsOptional()
  profileImage?: any;

  toEntity() {
    const user = new User();
    if (this.name) {
      user.name = this.name;
    }
    if (this.bio) {
      user.bio = this.bio;
    }
    return user;
  }
}
