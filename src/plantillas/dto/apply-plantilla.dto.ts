import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

const CODIGOS = ['CASCOS', 'UNIMOG'] as const;

export class ApplyPlantillaDto {
  @IsString()
  @IsIn(CODIGOS)
  codigo: string;

  @IsOptional()
  @IsBoolean()
  allowAppend?: boolean; // si true, agrega aunque ya existan requisitos
}
