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

    // Orden incremental automático: max(orden)+1 para ese proceso
    const raw = await this.repo
      .createQueryBuilder('r')
      .select('COALESCE(MAX(r.orden), 0)', 'max')
      .where('r.procesoId = :procesoId', { procesoId })
      .getRawOne<{ max: number | string }>();

    const orden = Number(raw?.max ?? 0) + 1;

    const req = this.repo.create();

    req.proceso = proceso;
    req.orden = orden;
    req.descripcion = dto.descripcion;
    req.aplica = dto.aplica ?? true;
    req.estado = (dto.estado as any) ?? 'pendiente';
    req.responsableTexto = dto.responsableTexto;
    req.observaciones = dto.observaciones;
    req.diasEstimados = dto.diasEstimados;

    return this.repo.save(req);
  }

  async update(id: number, dto: UpdateRequisitoDto) {
    const req = await this.repo.findOne({ where: { id } });
    if (!req) throw new NotFoundException('Requisito no encontrado');

    // Regla: no permitimos cambiar "orden" por update (si lo querés, lo hacemos después)
    const { orden, ...rest } = dto as any;
    Object.assign(req, rest);

    return this.repo.save(req);
  }

  async remove(id: number) {
    const req = await this.repo.findOne({ where: { id } });
    if (!req) throw new NotFoundException('Requisito no encontrado');

    await this.repo.remove(req);
    return { deleted: true };
  }
}
