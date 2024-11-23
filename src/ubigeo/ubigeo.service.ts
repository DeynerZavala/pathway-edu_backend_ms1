import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubigeo } from './ubigeo.entity';
import { Controller, Get, Query, Param, Inject } from '@nestjs/common';

@Injectable()
export class UbigeoService {
  constructor(
    @InjectRepository(Ubigeo)
    private readonly ubigeoRepository: Repository<Ubigeo>,
  ) {}

  // Crear un nuevo Ubigeo
  async createUbigeo(id: string, name: string): Promise<Ubigeo> {
    const exists = await this.ubigeoRepository.findOneBy({ id });
    if (exists) {
      throw new Error(`Ubigeo with ID ${id} already exists`);
    }

    const ubigeo = this.ubigeoRepository.create({ id, name });
    return this.ubigeoRepository.save(ubigeo);
  }
  async getCountries(): Promise<Ubigeo[]> {
    return await this.ubigeoRepository
      .createQueryBuilder('ubigeo')
      .where("ubigeo.id NOT LIKE '%-%'")
      .getMany();
  }

  async getDepartamentos(parentId: string): Promise<Ubigeo[]> {
    const prefix = `${parentId}-`; // Construir el prefijo del país (e.g., "01-")

    return await this.ubigeoRepository
      .createQueryBuilder('ubigeo')
      .where('ubigeo.id LIKE :prefix', { prefix: `${prefix}%` }) // IDs que empiezan con el prefijo
      .andWhere("LENGTH(ubigeo.id) - LENGTH(REPLACE(ubigeo.id, '-', '')) = 1") // Exactamente 1 guion
      .getMany();
  }

  async getProvincias(departmentId: string): Promise<Ubigeo[]> {
    const prefix = `${departmentId}-`; // Construir el prefijo del departamento (e.g., "01-01-")

    return await this.ubigeoRepository
      .createQueryBuilder('ubigeo')
      .where('ubigeo.id LIKE :prefix', { prefix: `${prefix}%` }) // IDs que empiezan con el prefijo
      .andWhere("LENGTH(ubigeo.id) - LENGTH(REPLACE(ubigeo.id, '-', '')) = 2") // Exactamente 2 guiones
      .getMany();
  }

  async getCiudades(provinceId: string): Promise<Ubigeo[]> {
    const prefix = `${provinceId}-`; // Construir el prefijo de la provincia (e.g., "01-01-01-")

    return await this.ubigeoRepository
      .createQueryBuilder('ubigeo')
      .where('ubigeo.id LIKE :prefix', { prefix: `${prefix}%` }) // IDs que empiezan con el prefijo
      .andWhere("LENGTH(ubigeo.id) - LENGTH(REPLACE(ubigeo.id, '-', '')) = 3") // Exactamente 3 guiones
      .getMany();
  }

  // Obtener todos los Ubigeos
  async findAll(): Promise<Ubigeo[]> {
    return this.ubigeoRepository.find();
  }

  // Obtener un Ubigeo por ID
  async findOne(id: string): Promise<Ubigeo> {
    const ubigeo = await this.ubigeoRepository.findOneBy({ id });
    if (!ubigeo) {
      throw new NotFoundException(`Ubigeo with ID ${id} not found`);
    }
    return ubigeo;
  }

  // Obtener hijos de un Ubigeo
  async findChildren(parentId: string): Promise<Ubigeo[]> {
    return this.ubigeoRepository
      .createQueryBuilder('ubigeo')
      .where('ubigeo.id LIKE :parentId', { parentId: `${parentId}-%` })
      .getMany();
  }

  // Eliminar un Ubigeo
  async deleteUbigeo(id: string): Promise<void> {
    const ubigeo = await this.findOne(id);
    await this.ubigeoRepository.remove(ubigeo);
  }
}
