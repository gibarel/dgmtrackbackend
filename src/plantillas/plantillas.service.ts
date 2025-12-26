import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proceso } from '../procesos/entities/proceso.entity';
import { RequisitoProceso } from '../requisitos/entities/requisito-proceso.entity';
import { ApplyPlantillaDto } from './dto/apply-plantilla.dto';
import { PlantillaItem } from './entities/plantilla-item.entity';
import { Plantilla } from './entities/plantilla.entity';

@Injectable()
export class PlantillasService {
  constructor(
    @InjectRepository(Plantilla) private plantillaRepo: Repository<Plantilla>,
    @InjectRepository(PlantillaItem) private itemRepo: Repository<PlantillaItem>,
    @InjectRepository(Proceso) private procesosRepo: Repository<Proceso>,
    @InjectRepository(RequisitoProceso) private reqRepo: Repository<RequisitoProceso>,
  ) {}

  async list() {
    return this.plantillaRepo.find({
      where: { activa: true },
      order: { id: 'ASC' },
      relations: { items: true },
    });
  }

  async applyToProceso(procesoId: number, dto: ApplyPlantillaDto) {
    const proceso = await this.procesosRepo.findOne({ where: { id: procesoId } });
    if (!proceso) throw new NotFoundException('Proceso no encontrado');

    const plantilla = await this.plantillaRepo.findOne({
      where: { codigo: dto.codigo, activa: true },
      relations: { items: true },
    });
    if (!plantilla) throw new NotFoundException('Plantilla no encontrada');

    const existentes = await this.reqRepo.count({ where: { proceso: { id: procesoId } } });
    const allowAppend = dto.allowAppend ?? false;

    if (existentes > 0 && !allowAppend) {
      throw new BadRequestException(
        'El proceso ya tiene requisitos. Use allowAppend=true para agregar.',
      );
    }

    // max orden actual del proceso
    const raw = await this.reqRepo
      .createQueryBuilder('r')
      .select('COALESCE(MAX(r.orden), 0)', 'max')
      .where('r.procesoId = :procesoId', { procesoId })
      .getRawOne<{ max: number | string }>();

    let baseOrden = Number(raw?.max ?? 0);

    const itemsOrdenados = (plantilla.items ?? []).slice().sort((a, b) => a.orden - b.orden);

    const nuevos: RequisitoProceso[] = [];
    for (const it of itemsOrdenados) {
      const req = this.reqRepo.create();
      baseOrden += 1;

      req.proceso = proceso;
      req.orden = baseOrden;
      req.descripcion = it.descripcion;
      req.aplica = it.aplica ?? true;
      req.estado = 'pendiente';
      req.diasEstimados = it.diasEstimados;

      nuevos.push(req);
    }

    await this.reqRepo.save(nuevos);

    return {
      inserted: nuevos.length,
      plantilla: { id: plantilla.id, codigo: plantilla.codigo, nombre: plantilla.nombre },
    };
  }
}
