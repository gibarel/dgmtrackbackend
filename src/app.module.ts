import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependenciasModule } from './dependencias/dependencias.module';
import { Dependencia } from './dependencias/entities/dependencia.entity';
import { Proceso } from './procesos/entities/proceso.entity';
import { ProcesosModule } from './procesos/procesos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/sistema_tracking.db',
      entities: [Dependencia, Proceso],
      synchronize: true, // solo dev
    }),
    DependenciasModule,
    ProcesosModule,
  ],
})
export class AppModule {}
