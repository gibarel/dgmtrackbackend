import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDepartamentoDto {
  @IsString()
  @MaxLength(120)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
