import { AccountType } from '../user.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfile {
  @ApiProperty({ description: '기기 유형', example: AccountType.ANDROID })
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty({ description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'bio' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ description: '프로필 이미지', type: 'string', format: 'binary' })
  profileImage: any;
}
