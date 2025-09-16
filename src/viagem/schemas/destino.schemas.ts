import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinoDocument = Destino & Document;

@Schema({ timestamps: true })
export class Destino {
  @Prop({ required: true })
  nome: string;
}

export const DestinoSchema = SchemaFactory.createForClass(Destino);
