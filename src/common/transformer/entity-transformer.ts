import { createCipheriv, createDecipheriv } from 'crypto';

export class EntityTransformer {
  private static readonly SECRET_KEY = 'VN4A297LLXDHLN7G';

  static readonly TRANSFORMER = {
    transformer: {
      to(value) {
        return EntityTransformer.encryptColumn(value);
      },
      from(value) {
        return EntityTransformer.decryptColumn(value);
      },
    },
  };

  /**
   * 암호화
   * @param value
   */
  static encryptColumn(value: string) {
    const cipher = createCipheriv('aes-128-ecb', this.SECRET_KEY, null);
    let encrypted = cipher.update(value, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  /**
   * 복호화
   * @param value
   */
  static decryptColumn(value: string) {
    const decipher = createDecipheriv('aes-128-ecb', this.SECRET_KEY, null);
    let dec = decipher.update(value, 'hex', 'utf-8');
    dec += decipher.final('utf-8');
    return dec;
  }
}
