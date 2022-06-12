import { Injectable } from '@nestjs/common';
import { CreateBucketlistDto } from './dto/create-bucketlist.dto';
import { BucketlistsService } from '../database/bucketlists/bucketlists.service';
import { Utils } from '../common/utils';
import { User } from '../database/users/entities/user.entity';
import { Bucketlist } from '../database/bucketlists/entity/bucketlist.entity';

@Injectable()
export class BucketlistService {
  constructor(private readonly bucketlistsService: BucketlistsService) {}
  /**
   * 버킷리스트 등록
   * @param userId
   * @param createBucketlistDto
   * @param imageFiles
   */
  async create(userId: number, createBucketlistDto: CreateBucketlistDto, imageFiles: Array<Express.Multer.File>) {
    let bucketlist: Bucketlist = createBucketlistDto.toEntity();
    const user = new User();
    user.id = userId;
    bucketlist.user = user;

    const imageObj = {
      imgUrl1: null,
      imgUrl2: null,
      imgUrl3: null,
    };

    if (imageFiles) {
      imageFiles.forEach((image, i) => {
        imageObj[`imgUrl${i + 1}`] = Utils.getDBFilePath(image);
      });
      bucketlist = { ...bucketlist, ...imageObj };
    }

    return this.bucketlistsService.save(bucketlist);
  }

  /**
   * 버킷리스트 목록 조회
   * @param userId
   */
  async findAll(userId: number) {
    return { bucketlists: this.bucketlistsService.findByUserId(userId) };
  }

  /**
   * 버킷리스트 상세 조회
   * @param id
   */
  async findOne(id: string) {
    return this.bucketlistsService.findById(id);
  }
}
