import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucketlist } from './entity/bucketlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BucketlistsService {
  constructor(@InjectRepository(Bucketlist) private readonly bucketlistRepository: Repository<Bucketlist>) {}

  save(bucketlist: Bucketlist) {
    return this.bucketlistRepository.save(bucketlist);
  }

  findByUserId(userId: number) {
    return this.bucketlistRepository.find({
      where: { userId },
      order: {
        orderSeq: 'DESC',
        createdDt: 'DESC',
      },
    });
  }

  findById(id: string) {
    return this.bucketlistRepository.findOne({ where: { id } });
  }
}
