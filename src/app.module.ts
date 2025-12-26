import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DependenciasModule } from './dependencias/dependencias.module';
import { PlantillasModule } from './plantillas/plantillas.module';
import { ProcesosModule } from './procesos/procesos.module';
import { RequisitosModule } from './requisitos/requisitos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/sistema_tracking.db',
      autoLoadEntities: true,
      synchronize: true, // solo dev
    }),
    DependenciasModule,
    ProcesosModule,
    RequisitosModule,
    PlantillasModule,
  ],
})
export class AppModule {}
