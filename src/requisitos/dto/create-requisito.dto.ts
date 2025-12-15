import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRequisitoDto {
  @IsInt()
  orden: number;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  aplica?: boolean;

  @IsOptional()
  @IsString()
  estado?: 'pendiente' | 'en_gestion' | 'completo' | 'no_aplica';

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
