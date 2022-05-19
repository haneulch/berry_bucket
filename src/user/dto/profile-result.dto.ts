import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileResult {
  @ApiProperty({ description: '이메일', example: 'test@mybury.com' })
  @Expose()
  email: number;

  @ApiProperty({ description: '이름', example: '마이버리' })
  @Expose()
  name: string;

  @ApiProperty({ description: '프로필 이미지' })
  @Expose()
  imgUrl: string;

  @ApiProperty({ description: 'bio' })
  @Expose()
  bio: string;
}
