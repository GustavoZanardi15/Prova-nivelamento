import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateViagemDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataSaida?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataChegada?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valor?: number;
}
