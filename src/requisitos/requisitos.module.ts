import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proceso } from '../procesos/entities/proceso.entity';
import { RequisitoProceso } from './entities/requisito-proceso.entity';
import { RequisitosController } from './requisitos.controller';
import { RequisitosService } from './requisitos.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequisitoProceso, Proceso])],
  controllers: [RequisitosController],
  providers: [RequisitosService],
})
export class RequisitosModule {}
