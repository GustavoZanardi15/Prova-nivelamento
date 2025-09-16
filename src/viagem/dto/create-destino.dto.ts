import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDestinoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
