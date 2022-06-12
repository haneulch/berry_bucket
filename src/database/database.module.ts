import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Bucketlist } from './bucketlists/entity/bucketlist.entity';
import { BucketlistsService } from './bucketlists/bucketlists.service';

@Module({
  providers: [UsersService, BucketlistsService],
  imports: [TypeOrmModule.forFeature([User, Bucketlist])],
  exports: [UsersService, BucketlistsService],
})
export class DatabaseModule {}
