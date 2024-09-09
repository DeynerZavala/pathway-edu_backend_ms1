import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('api/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() role: Partial<Role>): Promise<Role> {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
