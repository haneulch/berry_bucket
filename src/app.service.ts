import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * health check
   */
  getHello(): string {
    return 'Hello World!';
  }
}
