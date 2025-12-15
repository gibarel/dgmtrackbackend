import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proceso } from '../procesos/entities/proceso.entity';
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito.dto';
import { RequisitoProceso } from './entities/requisito-proceso.entity';

@Injectable()
export class RequisitosService {
  constructor(
    @InjectRepository(RequisitoProceso)
    private repo: Repository<RequisitoProceso>,
    @InjectRepository(Proceso)
    private procesosRepo: Repository<Proceso>,
  ) {}

  async findByProceso(procesoId: number) {
    return this.repo.find({
      where: { proceso: { id: procesoId } },
      order: { orden: 'ASC' },
    });
  }

  async create(procesoId: number, dto: CreateRequisitoDto) {
    const proceso = await this.procesosRepo.findOne({ where: { id: procesoId } });
    if (!proceso) throw new NotFoundException('Proceso no encontrado');

    const req = this.repo.create({
      ...dto,
      proceso,
      aplica: dto.aplica ?? true,
      estado: dto.estado ?? 'pendiente',
    });

    return this.repo.save(req);
  }

  async update(id: number, dto: UpdateRequisitoDto) {
    const req = await this.repo.findOne({ where: { id } });
    if (!req) throw new NotFoundException('Requisito no encontrado');

    Object.assign(req, dto);
    return this.repo.save(req);
  }

  async remove(id: number) {
    const req = await this.repo.findOne({ where: { id } });
    if (!req) throw new NotFoundException('Requisito no encontrado');

    await this.repo.remove(req);
    return { deleted: true };
  }
}
