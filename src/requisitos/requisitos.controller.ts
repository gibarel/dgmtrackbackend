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

import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito.dto';
import { RequisitosService } from './requisitos.service';

@Controller()
export class RequisitosController {
  constructor(private readonly service: RequisitosService) {}

  // NUEVO: soporte para el front actual -> /requisitos?procesoId=1
  @Get('requisitos')
  find(@Query('procesoId') procesoId?: string) {
    if (!procesoId) return [];
    return this.service.findByProceso(Number(procesoId));
  }

  // EXISTENTE: lo mantenemos -> /procesos/:id/requisitos
  @Get('procesos/:id/requisitos')
  findByProceso(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByProceso(id);
  }

  // (dejá el resto de tus endpoints tal cual los tenías)
  @Post('procesos/:id/requisitos')
  create(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRequisitoDto) {
    return this.service.create(id, dto);
  }

  @Patch('requisitos/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRequisitoDto) {
    return this.service.update(id, dto);
  }

  @Delete('requisitos/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
