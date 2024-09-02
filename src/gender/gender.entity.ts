import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  gender_id: number;

  @Column({ length: 20 })
  gender_name: string;
}
