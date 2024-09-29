import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern({ cmd: 'get_roles' })
  async getRoles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @MessagePattern({ cmd: 'get_role_by_id' })
  async getRoleById(id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_role' })
  async createRole(role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @MessagePattern({ cmd: 'update_role' })
  async updateRole(data: { id: number; role: Partial<Role> }): Promise<Role> {
    return this.roleService.update(data.id, data.role);
  }

  @MessagePattern({ cmd: 'delete_role' })
  async deleteRole(id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
