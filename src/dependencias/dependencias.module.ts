import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependenciasController } from './dependencias.controller';
import { DependenciasService } from './dependencias.service';
import { Dependencia } from './entities/dependencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dependencia])],
  controllers: [DependenciasController],
  providers: [DependenciasService],
  exports: [TypeOrmModule],
})
export class DependenciasModule {}
