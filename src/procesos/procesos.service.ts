import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Dependencia } from '../dependencias/entities/dependencia.entity';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { Proceso } from './entities/proceso.entity';

@Injectable()
export class ProcesosService {
  constructor(
    @InjectRepository(Proceso) private repo: Repository<Proceso>,
    @InjectRepository(Dependencia) private depRepo: Repository<Dependencia>,
  ) {}

  async create(dto: CreateProcesoDto) {
    const p = this.repo.create({
      ...dto,
      estado: dto.estado ?? 'pendiente',
      activo: dto.activo ?? true,
    });
    if (dto.dependenciasIds?.length) {
      p.dependencias = await this.depRepo.find({ where: { id: In(dto.dependenciasIds) } });
    }
    return this.repo.save(p);
  }

  findAll(skip = 0, take = 50) {
    return this.repo.find({ skip, take, order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Proceso no encontrado');
    return p;
  }

  async update(id: number, dto: UpdateProcesoDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    if (dto.dependenciasIds) {
      p.dependencias = dto.dependenciasIds.length
        ? await this.depRepo.find({ where: { id: In(dto.dependenciasIds) } })
        : [];
    }
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
    return { deleted: true };
  }
}
