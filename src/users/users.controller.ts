import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<{ message: string; users: Users[] }> {
    const users = await this.usersService.findAll();
    return {
      message: 'Users fetched successfully',
      users,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; user: Users }> {
    const user = await this.usersService.findOne(id);
    return {
      message: `User with ID ${id} fetched successfully`,
      user,
    };
  }

  @Post()
  async create(@Body() user: Users): Promise<{ message: string; user: Users }> {
    const newUser = await this.usersService.create(user);
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: Partial<Users>,
  ): Promise<{ message: string; updatedUser: Users }> {
    const updatedUser = await this.usersService.update(id, user);
    return {
      message: `User with ID ${id} updated successfully`,
      updatedUser,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return {
      message: `User with ID ${id} has been deleted successfully`,
    };
  }
}
