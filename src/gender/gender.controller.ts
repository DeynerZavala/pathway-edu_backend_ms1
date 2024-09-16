import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { Gender } from './gender.entity';

@Controller('api/gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Get()
  findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Post()
  create(@Body() gender: Gender): Promise<Gender> {
    return this.genderService.create(gender);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() gender: Partial<Gender>,
  ): Promise<Gender> {
    return this.genderService.update(id, gender);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.genderService.remove(id);
  }
}
