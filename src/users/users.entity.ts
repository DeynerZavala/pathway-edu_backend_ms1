import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gender } from '../gender/gender.entity';
import { Role } from '../role/role.entity';
import { Ubigeo } from '../ubigeo/ubigeo.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ type: 'date' })
  date_of_birth: string;

  @ManyToOne(() => Gender, { eager: true })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Ubigeo, { eager: true }) // Relación con Ubigeo
  @JoinColumn({ name: 'ubigeo_id' })
  ubigeo: Ubigeo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;
}
