import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Destino } from './destino.schemas';

export type ViagemDocument = Viagem & Document;

@Schema({ timestamps: true })
export class Viagem {
  @Prop({ required: true })
  nome: string;

  @Prop()
  dataSaida?: Date;

  @Prop()
  dataChegada?: Date;

  @Prop({ type: Number })
  valor?: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Destino' }], default: [] })
  destinos: Types.ObjectId[] | Destino[];
}

export const ViagemSchema = SchemaFactory.createForClass(Viagem);
