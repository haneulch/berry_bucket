import { Module } from '@nestjs/common';
import { BucketlistService } from './bucketlist.service';
import { BucketlistController } from './bucketlist.controller';
import { DatabaseModule } from '../database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('UPLOAD_PATH'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BucketlistController],
  providers: [BucketlistService],
})
export class BucketlistModule {}
