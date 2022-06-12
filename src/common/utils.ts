import { DateTime } from 'luxon';

export class Utils {
  public static UPLOAD_PATH = '/Users/ruth/Desktop/DATA/WEB/mybury/storage';
  public static DEFAULT_FORMAT = 'yyyy-MM-dd HH:mm:ss';
  public static DEFAULT_TIMEZONE = 'Asia/Seoul';

  /**
   * 업로드 경로
   */
  static getTodayFolder() {
    return `${this.UPLOAD_PATH}/${DateTime.now().setZone(this.DEFAULT_TIMEZONE).toFormat('yyyyMMdd')}`;
  }

  /**
   * 파일명에서 확장자 추출
   */
  static getExtensionFromFile(fileName: string) {
    return fileName.substring(fileName.indexOf('.'));
  }

  /**
   * 파일에서 DB에 저장될 경로 추출
   * @param file
   */
  static getDBFilePath(file: Express.Multer.File) {
    const filePath = file.path.replace(this.UPLOAD_PATH, '');
    return `${filePath}`;
  }

  /**
   * 문자열을 날짜로 변환
   * @param text
   * @param format
   * @param previousFormat
   */
  static changeFormat(text: string, format = this.DEFAULT_FORMAT, previousFormat = 'yyyy-MM-dd') {
    return DateTime.fromFormat(text, previousFormat).toFormat(format);
  }

  /**
   * 현재 시간
   * @param format
   */
  static nowDate(format = this.DEFAULT_FORMAT) {
    return DateTime.now().setZone(this.DEFAULT_TIMEZONE).toFormat(format);
  }
}
