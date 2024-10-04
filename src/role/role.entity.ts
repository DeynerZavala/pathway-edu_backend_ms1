import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from 'src/users/users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ length: 20 })
  role_name: string;

  @Column('text')
  role_description: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
