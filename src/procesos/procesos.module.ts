import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependencia } from '../dependencias/entities/dependencia.entity';
import { Proceso } from './entities/proceso.entity';
import { ProcesosController } from './procesos.controller';
import { ProcesosService } from './procesos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proceso, Dependencia])],
  controllers: [ProcesosController],
  providers: [ProcesosService],
})
export class ProcesosModule {}
