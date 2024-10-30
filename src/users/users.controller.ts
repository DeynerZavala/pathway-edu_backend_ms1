import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(): Promise<any> {
    return await this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(id: string): Promise<any> {
    return await this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(user: any): Promise<any> {
    return await this.usersService.create(user);
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(data: { id: string; user: any }): Promise<any> {
    return await this.usersService.update(data.id, data.user);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(id: string): Promise<any> {
    return await this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'login_user' })
  async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<{ message: string; user?: any }> {
    const user = await this.usersService.validateUser(
      credentials.email,
      credentials.password,
    );
    if (user) {
      return { message: 'User logged in successfully', user };
    } else {
      return { message: 'Invalid credentials + cambio' };
    }
  }
  
}
