import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AccountType, YnType } from '../../../common/enums/common-enum';
import { UserStatus } from '../../../common/enums/user-status.enum';
import { Bucketlist } from '../../bucketlists/entity/bucketlist.entity';
import { DateTime } from 'luxon';
import { Utils } from '../../../common/utils';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column({ default: AccountType.ANDROID })
  accountType?: AccountType;

  @Column()
  name?: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ default: YnType.Y })
  alarmYn?: YnType;

  @Column({ type: 'datetime', default: Utils.nowDate() })
  lastLoginDt?: DateTime;

  @Column({ default: UserStatus.ACTIVE, length: 10 })
  status?: UserStatus;

  @CreateDateColumn()
  createdDt?: DateTime;

  @UpdateDateColumn()
  updatedDt?: DateTime;

  @OneToMany(() => Bucketlist, (bucketlist) => bucketlist.user)
  bucketlist?: Bucketlist[];
}
