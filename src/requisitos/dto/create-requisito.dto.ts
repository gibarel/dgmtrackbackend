import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

const ESTADOS_REQ = ['pendiente', 'en_gestion', 'completo', 'no_aplica'] as const;

export class CreateRequisitoDto {
  @IsOptional()
  @IsInt()
  orden?: number; // se ignora, lo calcula el backend

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  aplica?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(ESTADOS_REQ)
  estado?: string;

  @IsOptional()
  @IsString()
  responsableTexto?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsInt()
  diasEstimados?: number;
}
