import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
