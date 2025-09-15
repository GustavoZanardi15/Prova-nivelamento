import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ViagemDocument = Viagem & Document;

@Schema()
export class Viagem {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  dataSaida: Date;

  @Prop()
  dataChegada?: Date;

  @Prop()
  valor?: string;
}

export const ViagemSchema = SchemaFactory.createForClass(Viagem);
