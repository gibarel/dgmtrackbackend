import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosModule } from './departamentos/departamentos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/sistema_tracking.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DepartamentosModule,
  ],
})
export class AppModule {}
