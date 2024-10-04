import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { Gender } from 'src/gender/gender.entity';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: { user_id: id },
    });
  }

  async create(user: Users): Promise<Users> {
    // Supongamos que gender_id y role_id son propiedades en el objeto user que recibes.
    const gender = await this.genderRepository.findOne({
      where: { gender_id: user.gender.gender_id },
    });
    const role = await this.roleRepository.findOne({
      where: { role_id: user.role.role_id },
    });

    if (!gender || !role) {
      throw new Error('Gender or Role not found');
    }

    // Asignar las entidades completas de Gender y Role
    user.gender = gender;
    user.role = role;

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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }
}
