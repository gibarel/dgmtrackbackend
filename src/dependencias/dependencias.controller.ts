import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DependenciasService } from './dependencias.service';
import { CreateDependenciaDto } from './dto/create-dependencia.dto';
import { UpdateDependenciaDto } from './dto/update-dependencia.dto';

@Controller('dependencias')
export class DependenciasController {
  constructor(private readonly svc: DependenciasService) {}

  @Post() create(@Body() dto: CreateDependenciaDto) {
    return this.svc.create(dto);
  }
  @Get() findAll() {
    return this.svc.findAll();
  }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDependenciaDto) {
    return this.svc.update(id, dto);
  }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
