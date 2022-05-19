import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BucketlistService } from './bucketlist.service';
import { CreateBucketlistDto } from './dto/create-bucketlist.dto';
import { UpdateBucketlistDto } from './dto/update-bucketlist.dto';

@Controller('bucketlist')
export class BucketlistController {
  constructor(private readonly bucketlistService: BucketlistService) {}

  @Post()
  create(@Body() createBucketlistDto: CreateBucketlistDto) {
    return this.bucketlistService.create(createBucketlistDto);
  }

  @Get()
  findAll() {
    return this.bucketlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bucketlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBucketlistDto: UpdateBucketlistDto) {
    return this.bucketlistService.update(+id, updateBucketlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bucketlistService.remove(+id);
  }
}
