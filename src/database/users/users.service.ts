import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findById(userId: number) {
    return this.userRepository.find({ where: { id: userId } });
  }

  findIdById(userId: number) {
    return this.userRepository.find({ select: ['id'], where: { id: userId } });
  }

  find() {
    return this.userRepository.findOne({ where: { id: IsNotEmpty }, order: { createdDt: 'DESC' } });
  }

  update(userId: number, user: User) {
    return this.userRepository.update(userId, user);
  }

  async save(user: User) {
    const count = await this.userRepository.count({ where: { email: user.email } });
    if (count > 0) {
      throw new BadRequestException('중복된 이메일입니다.');
    }
    return this.userRepository.save(user);
  }
}
