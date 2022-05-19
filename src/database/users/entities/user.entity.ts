import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { YnType } from '../../../common/enums/common-enum';
import { EntityTransformer } from '../../../common/transformer/entity-transformer';

@Entity({ name: 'mt_user' })
export class User {
  @PrimaryColumn()
  id?: string;

  @Column({ ...EntityTransformer.TRANSFORMER })
  email?: number;

  @Column({ name: 'account_type' })
  accountType?: number;

  @Column({ ...EntityTransformer.TRANSFORMER })
  name?: string;

  @Column({ name: 'img_url', ...EntityTransformer.TRANSFORMER })
  imgUrl?: string;

  @Column({ name: 'user_seq' })
  userSeq?: number;

  @Column()
  bio?: string;

  @Column({ name: 'alarm_yn' })
  alarmYn?: YnType;

  @Column({ name: 'last_login_dt' })
  lastLoginDt?: Date;

  @Column()
  enabled?: boolean;

  @CreateDateColumn({ name: 'created_dt' })
  createdDt?: string;

  @UpdateDateColumn({ name: 'updated_dt', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedDt?: string;
}
