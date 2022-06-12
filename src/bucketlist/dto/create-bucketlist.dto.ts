import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { BucketType } from '../../database/bucketlists/bucket-type.enum';
import { Bucketlist } from '../../database/bucketlists/entity/bucketlist.entity';
import { DateTime } from 'luxon';
import { Type } from 'class-transformer';

export class CreateBucketlistDto {
  @ApiPropertyOptional({
    description: '종류<br>ORIGINAL: 기본<br>TOGETHER: 함께하기<br>CHALLENGE: 챌린지',
    default: BucketType.ORIGINAL,
  })
  @IsOptional()
  @IsEnum(BucketType)
  bucketType: BucketType = BucketType.ORIGINAL;

  @ApiProperty({ description: '내용' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: '메모' })
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiPropertyOptional({ description: '태그 목록(최대 5)', maxLength: 5 })
  @IsOptional()
  @IsArray()
  @Length(0, 5)
  tags: string[];

  @ApiPropertyOptional({ description: '이미지 목록(최대 3)', maxLength: 3, format: 'binary' })
  @IsOptional()
  @IsArray()
  @Length(0, 3)
  images: any[];

  @ApiPropertyOptional({ description: '목표완료일(yyyy-MM-dd)' })
  @IsOptional()
  @IsString()
  targetDate: string;

  @ApiProperty({ description: '목표 횟수' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  goalCount: number;

  @ApiPropertyOptional({ description: '카테고리 ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  toEntity(): Bucketlist {
    const bucketlist = new Bucketlist();
    bucketlist.bucketType = this.bucketType;
    bucketlist.content = this.content;
    bucketlist.memo = this.memo;
    bucketlist.goalCount = this.goalCount;
    bucketlist.categoryId = this.categoryId;
    if (this.targetDate) {
      bucketlist.targetDate = DateTime.fromFormat(this.targetDate, 'yyyy-MM-dd');
    }
    return bucketlist;
  }
}
