import { DateTime } from 'luxon';

export class Utils {
  public static UPLOAD_PATH = '/Users/ruth/Desktop/DATA/WEB/mybury/storage';

  static getTodayFolder() {
    return `${this.UPLOAD_PATH}/${DateTime.now().setZone('Asia/Seoul').toFormat('yyyyMMdd')}`;
  }

  static getExtensionFromFile(fileName: string) {
    return fileName.substring(fileName.indexOf('.'));
  }

  static getDBFilePath(file: Express.Multer.File) {
    const filePath = file.path.replace(this.UPLOAD_PATH, '');
    return `${filePath}${Utils.getExtensionFromFile(file.originalname)}`;
  }
}
