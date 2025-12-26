import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplyPlantillaDto } from './dto/apply-plantilla.dto';
import { PlantillasService } from './plantillas.service';

@Controller()
export class PlantillasController {
  constructor(private readonly svc: PlantillasService) {}

  @Get('plantillas')
  list() {
    return this.svc.list();
  }

  @Post('procesos/:id/plantilla')
  apply(@Param('id') id: string, @Body() dto: ApplyPlantillaDto) {
    return this.svc.applyToProceso(Number(id), dto);
  }
}
