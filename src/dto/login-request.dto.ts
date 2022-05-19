import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: 'User Id' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
