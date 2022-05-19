import { PartialType } from '@nestjs/swagger';
import { CreateBucketlistDto } from './create-bucketlist.dto';

export class UpdateBucketlistDto extends PartialType(CreateBucketlistDto) {}
