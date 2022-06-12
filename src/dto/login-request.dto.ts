import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: 'User Id' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
