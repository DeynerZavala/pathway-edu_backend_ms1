import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

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
    return this.usersRepository.save(user);
  }

  async update(id: string, user: Partial<Users>): Promise<Users> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
