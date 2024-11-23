import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { Gender } from 'src/gender/gender.entity';
import { Role } from 'src/role/role.entity';
import { Ubigeo } from 'src/ubigeo/ubigeo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Gender, Role, Ubigeo])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
