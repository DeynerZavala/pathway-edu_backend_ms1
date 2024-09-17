import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find({ relations: ['gender', 'role'] });
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { user_id: id },
      relations: ['gender', 'role'],
    });
  }

  async create(user: Users): Promise<Users> {
    const salt = await bcrypt.genSalt();
    user.password_hash = await bcrypt.hash(user.password_hash, salt);
    return this.usersRepository.save(user);
  }

  async update(id: string, userUpdates: Partial<Users>): Promise<Users> {
    if (userUpdates.password_hash) {
      const salt = await bcrypt.genSalt();
      userUpdates.password_hash = await bcrypt.hash(
        userUpdates.password_hash,
        salt,
      );
    }
    await this.usersRepository.update(id, userUpdates);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Verificación de usuario
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string; user?: any }> {
    const user = await this.usersService.validateUser(
      body.email,
      body.password,
    );
    if (user) {
      return { message: 'User logged in successfully', user };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
