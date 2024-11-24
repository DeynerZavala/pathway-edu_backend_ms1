import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UbigeoService } from './ubigeo.service';
import { Ubigeo } from './ubigeo.entity';

@Controller()
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  @MessagePattern({ cmd: 'get_countries' })
  async getCountries(): Promise<Ubigeo[]> {
    return this.ubigeoService.getCountries();
  }

  @MessagePattern({ cmd: 'get_departamentos' })
  async getDepartamentos(parentId: string): Promise<Ubigeo[]> {
    return this.ubigeoService.getDepartamentos(parentId);
  }

  @MessagePattern({ cmd: 'get_provincias' })
  async getProvincias(departmentId: string): Promise<Ubigeo[]> {
    return this.ubigeoService.getProvincias(departmentId);
  }

  @MessagePattern({ cmd: 'get_ciudades' })
  async getCiudades(provinceId: string): Promise<Ubigeo[]> {
    return this.ubigeoService.getCiudades(provinceId);
  }

  @MessagePattern({ cmd: 'find_ubigeo' })
  async findUbigeo(id: string): Promise<Ubigeo> {
    return this.ubigeoService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_children' })
  async findChildren(parentId: string): Promise<Ubigeo[]> {
    return this.ubigeoService.findChildren(parentId);
  }

  @MessagePattern({ cmd: 'get_ubigeo' })
  async findAll() {
    return this.ubigeoService.findAll;
  }

  @MessagePattern({ cmd: 'get_one_ubigeo' })
  async findOne(id: string) {
    return this.ubigeoService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_ubigeo' })
  async createUbigeo(data: { id: string; name: string }): Promise<Ubigeo> {
    return this.ubigeoService.createUbigeo(data.id, data.name);
  }

  @MessagePattern({ cmd: 'delete_ubigeo' })
  async deleteUbigeo(id: string): Promise<void> {
    return this.ubigeoService.deleteUbigeo(id);
  }
}
