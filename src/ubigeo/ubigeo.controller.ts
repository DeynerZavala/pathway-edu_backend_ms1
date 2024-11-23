import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UbigeoService } from './ubigeo.service';
import { Ubigeo } from './ubigeo.entity';

@Controller()
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  // Obtener todos los Ubigeos
  @MessagePattern({ cmd: 'get_all_ubigeos' })
  async getAllUbigeos(): Promise<Ubigeo[]> {
    return await this.ubigeoService.findAll();
  }

  // Obtener un Ubigeo por ID
  @MessagePattern({ cmd: 'get_ubigeo_by_id' })
  async getUbigeoById(id: string): Promise<Ubigeo> {
    return await this.ubigeoService.findOne(id);
  }

  // Crear un nuevo Ubigeo
  @MessagePattern({ cmd: 'create_ubigeo' })
  async createUbigeo(data: { id: string; name: string }): Promise<Ubigeo> {
    return await this.ubigeoService.createUbigeo(data.id, data.name);
  }

  // Obtener hijos de un Ubigeo
  @MessagePattern({ cmd: 'get_children_by_ubigeo' })
  async getChildrenByUbigeo(parentId: string): Promise<Ubigeo[]> {
    return await this.ubigeoService.findChildren(parentId);
  }

  // Eliminar un Ubigeo por ID
  @MessagePattern({ cmd: 'delete_ubigeo' })
  async deleteUbigeo(id: string): Promise<void> {
    return await this.ubigeoService.deleteUbigeo(id);
  }
}
