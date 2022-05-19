import { ApiProperty } from '@nestjs/swagger';

export class LoginResult {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
