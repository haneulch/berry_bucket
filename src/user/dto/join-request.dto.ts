import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../database/users/entities/user.entity';

export class JoinRequest {
  @ApiProperty({ description: '이메일', example: 'mybury@gamil.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  toEntity() {
    const user = new User();
    user.email = this.email;
    user.name = '가입중';
    return user;
  }
}
