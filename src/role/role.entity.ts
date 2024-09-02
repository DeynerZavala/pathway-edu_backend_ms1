import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ length: 20 })
  role_name: string;

  @Column('text')
  role_description: string;
}
