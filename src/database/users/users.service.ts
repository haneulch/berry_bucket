import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findById(userId: string) {
    return this.userRepository.find({ where: { id: userId } });
  }

  findIdById(userId: string) {
    return this.userRepository.find({ select: ['id'], where: { id: userId } });
  }

  find() {
    return this.userRepository.findOne({ where: { id: IsNotEmpty }, order: { createdDt: 'DESC' } });
  }

  update(userId: string, user: User) {
    return this.userRepository.update(userId, user);
  }
}
