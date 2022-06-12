import { Body, Controller, Get, Param, Post, UploadedFiles } from '@nestjs/common';
import { BucketlistService } from './bucketlist.service';
import { CreateBucketlistDto } from './dto/create-bucketlist.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/decorators/user-id.decorator';
import { BucketlistResult } from './dto/bucketlist-result.dto';
import { plainToInstance } from 'class-transformer';
import { BucketlistDetailResult } from './dto/bucketlist-detail-result.dto';
import { ApiFiles } from '../common/decorators/api-file.decorator';

@ApiTags('버킷리스트')
@ApiBearerAuth()
@Controller('bucketlist')
export class BucketlistController {
  constructor(private readonly bucketlistService: BucketlistService) {}

  @ApiOperation({ summary: '버킷리스트 등록' })
  @ApiFiles('images', CreateBucketlistDto)
  @ApiOkResponse({ description: '성공', type: BucketlistResult })
  @Post()
  create(
    @UserId() userId: number,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createBucketlistDto: CreateBucketlistDto,
  ): BucketlistDetailResult {
    return plainToInstance(BucketlistDetailResult, this.bucketlistService.create(userId, createBucketlistDto, images));
  }

  @ApiOperation({ summary: '버킷리스트 목록' })
  @ApiOkResponse({ description: '성공', type: BucketlistResult })
  @Get()
  findAll(@UserId() userId: number): BucketlistResult {
    return plainToInstance(BucketlistResult, this.bucketlistService.findAll(userId));
  }

  @ApiOperation({ summary: '버킷리스트 상세' })
  @ApiOkResponse({ description: '성공', type: BucketlistDetailResult })
  @Get(':id')
  findOne(@UserId() userId: number, @Param('id') id: string): BucketlistDetailResult {
    return plainToInstance(BucketlistDetailResult, this.bucketlistService.findOne(id));
  }
}
