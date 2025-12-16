import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

const ESTADOS = ['pendiente', 'en_progreso', 'finalizado', 'cancelado'] as const;
export type EstadoProceso = (typeof ESTADOS)[number];

export class CreateProcesoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  // NUEVO
  @IsOptional()
  @IsString()
  numeroExpediente?: string;

  // NUEVO
  @IsOptional()
  @IsString()
  tipoActo?: string;

  @IsOptional()
  @IsEnum(ESTADOS)
  estado?: EstadoProceso;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsNumber()
  diasEstimados?: number;

  @IsOptional()
  @IsNumber()
  montoPrevisto?: number;


  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  dependenciasIds?: number[];

  @IsOptional()
  @IsString()
  caso?: string;

  @IsOptional()
  @IsString()
  situacionActual?: string;

  @IsOptional()
  @IsString()
  puntosPrincipales?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

}
