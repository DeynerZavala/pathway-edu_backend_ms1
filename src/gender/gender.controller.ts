import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GenderService } from './gender.service';
import { Gender } from './gender.entity';

@Controller()
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @MessagePattern({ cmd: 'get_genders' })
  async getGenders(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @MessagePattern({ cmd: 'get_gender_by_id' })
  async getGenderById(id: number): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_gender' })
  async createGender(gender: Gender): Promise<Gender> {
    return this.genderService.create(gender);
  }

  @MessagePattern({ cmd: 'update_gender' })
  async updateGender(data: {
    id: number;
    gender: Partial<Gender>;
  }): Promise<Gender> {
    return this.genderService.update(data.id, data.gender);
  }

  @MessagePattern({ cmd: 'delete_gender' })
  async deleteGender(id: number): Promise<void> {
    return this.genderService.remove(id);
  }
}
