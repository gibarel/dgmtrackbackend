import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { ProcesosService } from './procesos.service';

@Controller('procesos')
export class ProcesosController {
  constructor(private readonly svc: ProcesosService) {}

  @Post() create(@Body() dto: CreateProcesoDto) {
    return this.svc.create(dto);
  }
  @Get() findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.svc.findAll(Number(skip ?? 0), Number(take ?? 50));
  }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProcesoDto) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
