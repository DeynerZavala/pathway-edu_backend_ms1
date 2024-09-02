import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './gender.entity';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
  ) {}

  findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  findOne(id: number): Promise<Gender> {
    return this.genderRepository.findOne({ where: { gender_id: id } });
  }

  async create(gender: Gender): Promise<Gender> {
    return this.genderRepository.save(gender);
  }

  async update(id: number, gender: Partial<Gender>): Promise<Gender> {
    await this.genderRepository.update(id, gender);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.genderRepository.delete(id);
  }
}
