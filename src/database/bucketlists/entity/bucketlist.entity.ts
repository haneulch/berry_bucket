import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BucketType } from '../bucket-type.enum';
import { YnType } from '../../../common/enums/common-enum';
import { User } from '../../users/entities/user.entity';
import { DateTime } from 'luxon';

@Entity({ name: 'bucketlist' })
export class Bucketlist {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ comment: '내용', type: 'text' })
  content: string;

  @Column({ comment: '메모', type: 'text' })
  memo: string;

  @Column({ default: YnType.N, comment: '공개 여부', length: 1 })
  open?: YnType;

  @Column({ default: YnType.N, comment: '고정 여부', length: 1 })
  pin?: YnType;

  @Column({ default: YnType.N, comment: '완료 여부', length: 1 })
  complete?: YnType;

  @Column({ comment: '목표일자', nullable: true, type: 'datetime' })
  targetDate?: DateTime;

  @Column({ name: 'userCount', default: 0, comment: '수행 횟수' })
  userCount?: number;

  @Column({ name: 'goalCount', default: 0, comment: '목표 횟수' })
  goalCount?: number;

  @Column({ comment: '완료일시', nullable: true, type: 'datetime' })
  completedDate?: string;

  @Column({ default: BucketType.ORIGINAL, comment: '버킷 종류', length: 10 })
  bucketType?: BucketType;

  @Column({ default: 0, comment: '정렬 순서' })
  orderSeq?: number;

  @Column({ nullable: true })
  imgUrl1?: string;

  @Column({ nullable: true })
  imgUrl2?: string;

  @Column({ nullable: true })
  imgUrl3?: string;

  @Column({ nullable: true, comment: '카테고리 ID' })
  categoryId?: number;

  @ManyToOne(() => User, (user) => user.bucketlist)
  user: User;

  @CreateDateColumn()
  createdDt?: DateTime;

  @UpdateDateColumn()
  updatedDt?: DateTime;
}
