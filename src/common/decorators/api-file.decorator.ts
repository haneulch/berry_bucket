import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
            const ext = Utils.getExtensionFromFile(file.originalname);
            callback(null, `${v4()}${ext}`);
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

export function ApiFiles(fieldName: string, className: any) {
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(fieldName, 3, {
        storage: diskStorage({
          destination: `${Utils.getTodayFolder()}`,
          filename(req, file: Express.Multer.File, callback) {
            const ext = Utils.getExtensionFromFile(file.originalname);
            callback(null, `${v4()}${ext}`);
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
