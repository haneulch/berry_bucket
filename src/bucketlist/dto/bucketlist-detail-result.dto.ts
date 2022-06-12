import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class BucketlistDetailResult {
  @Expose()
  @ApiProperty({ description: '제목', example: '자전거 여행 리스트' })
  title: string;

  @Expose()
  @ApiProperty({ description: '내용', example: '내용~~~~' })
  content: string;

  @Expose()
  @ApiProperty({ description: '카테고리명', example: '없음' })
  categoryName: string;

  @Expose()
  @ApiProperty({ description: '목표 횟수', example: 5 })
  goalCount: number;

  @Expose()
  @ApiProperty({ description: '수행 횟수', example: 2 })
  userCount: number;

  @Expose()
  @ApiPropertyOptional({ description: '완료일시(yyyy-MM-dd HH:mm:ss)', example: '2022-02-02 12:22:22' })
  completedDt: string;

  @Expose()
  @ApiPropertyOptional({ description: '태그 목록' })
  tags: string[];

  @Expose()
  @ApiPropertyOptional({ description: '이미지 목록' })
  images: string[];
}
