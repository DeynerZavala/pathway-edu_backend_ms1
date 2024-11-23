import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ubigeo')
export class Ubigeo {
  @PrimaryColumn()
  id: string; // ID jerárquico numérico (e.g., 01(Pais), 01-15(Departamento),01-15-01(Provincia), 01-15-01-01(Distrito))

  @Column('text')
  name: string; // Nombre del lugar (País, Departamento, Provincia o Distrito)
}
