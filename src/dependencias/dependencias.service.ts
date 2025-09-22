import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDependenciaDto } from './dto/create-dependencia.dto';
import { UpdateDependenciaDto } from './dto/update-dependencia.dto';
import { Dependencia } from './entities/dependencia.entity';

@Injectable()
export class DependenciasService {
  constructor(@InjectRepository(Dependencia) private repo: Repository<Dependencia>) {}

  async create(dto: CreateDependenciaDto) {
    const dep = this.repo.create({
      activo: dto.activo ?? true,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
    });
    if (dto.padreId)
      dep.padre = (await this.repo.findOne({ where: { id: dto.padreId } })) ?? undefined;
    return this.repo.save(dep);
  }

  findAll() {
    return this.repo.find({ relations: { padre: true, hijos: true }, order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const dep = await this.repo.findOne({ where: { id }, relations: { padre: true, hijos: true } });
    if (!dep) throw new NotFoundException('Dependencia no encontrada');
    return dep;
  }

  async update(id: number, dto: UpdateDependenciaDto) {
    const dep = await this.findOne(id);
    if (dto.padreId !== undefined) {
      dep.padre = dto.padreId
        ? ((await this.repo.findOne({ where: { id: dto.padreId } })) ?? undefined)
        : undefined;
    }
    if (dto.nombre !== undefined) dep.nombre = dto.nombre;
    if (dto.descripcion !== undefined) dep.descripcion = dto.descripcion;
    if (dto.activo !== undefined) dep.activo = dto.activo;
    return this.repo.save(dep);
  }

  async remove(id: number) {
    const dep = await this.findOne(id);
    await this.repo.remove(dep);
    return { deleted: true };
  }
}
