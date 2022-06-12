import { Status } from '../../database/bucketlists/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class BucketlistResult {
  @Expose()
  @Type(() => BucketlistSummary)
  bucketlists: BucketlistSummary[];
}

@Exclude()
export class BucketlistSummary {
  @Expose()
  @ApiProperty({ description: '제목', example: '자전거 여행 리스트' })
  title: string;

  @Expose()
  @ApiProperty({ description: '완료여부<br>1: 진행중<br>2: 완료', example: Status.COMPLETE })
  status: Status;

  @Expose()
  @ApiPropertyOptional({ description: 'dDay(지난 경우 +)', example: 10 })
  dDay: number;
}
