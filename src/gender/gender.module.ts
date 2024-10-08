import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { Gender } from './gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  providers: [GenderService],
  controllers: [GenderController],
  exports: [GenderService],
})
export class GenderModule {}
