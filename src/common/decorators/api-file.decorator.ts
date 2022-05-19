import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Utils } from '../utils';
import { v4 } from 'uuid';

export function ApiFile(fieldName: string, className: any) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: `${Utils.getTodayFolder()}`,
          filename(req, file: Express.Multer.File, callback) {
            callback(null, v4());
          },
        }),
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: className,
    }),
  );
}
