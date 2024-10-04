import { Users } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  gender_id: number;

  @Column({ length: 20 })
  gender_name: string;

  @OneToMany(() => Users, (user) => user.gender)
  users: Users[];
}
