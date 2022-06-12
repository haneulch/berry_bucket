import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccountType } from '../../common/enums/common-enum';
import { User } from '../../database/users/entities/user.entity';

export class CreateProfile {
  @ApiProperty({ description: '기기 유형', example: AccountType.ANDROID })
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty({ description: '이름', example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'bio', example: '반가워요. 저는 홍길동이에요.' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ description: '프로필 이미지', type: 'string', format: 'binary' })
  @IsOptional()
  profileImage: any;

  toEntity(): User {
    const user = new User();
    user.accountType = this.accountType;
    user.name = this.name;
    if (this.bio) {
      user.bio = this.bio;
    }
    return user;
  }
}
