import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartamentosModule } from './departamentos/departamentos.module';

@Module({
  imports: [DepartamentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'data/sistema_tracking.db',
  autoLoadEntities: true,
  synchronize: true,
});
