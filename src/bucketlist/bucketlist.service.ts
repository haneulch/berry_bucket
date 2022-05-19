import { Injectable } from '@nestjs/common';
import { CreateBucketlistDto } from './dto/create-bucketlist.dto';
import { UpdateBucketlistDto } from './dto/update-bucketlist.dto';

@Injectable()
export class BucketlistService {
  create(createBucketlistDto: CreateBucketlistDto) {
    return 'This action adds a new bucketlist';
  }

  findAll() {
    return `This action returns all bucketlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bucketlist`;
  }

  update(id: number, updateBucketlistDto: UpdateBucketlistDto) {
    return `This action updates a #${id} bucketlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} bucketlist`;
  }
}
