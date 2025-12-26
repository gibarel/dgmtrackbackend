import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proceso } from '../procesos/entities/proceso.entity';
import { RequisitoProceso } from '../requisitos/entities/requisito-proceso.entity';
import { PlantillaItem } from './entities/plantilla-item.entity';
import { Plantilla } from './entities/plantilla.entity';
import { PlantillasController } from './plantillas.controller';
import { PlantillasService } from './plantillas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plantilla, PlantillaItem, Proceso, RequisitoProceso])],
  controllers: [PlantillasController],
  providers: [PlantillasService],
})
export class PlantillasModule {}
