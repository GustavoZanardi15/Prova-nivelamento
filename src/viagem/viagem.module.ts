import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ViagemService } from './viagem.service';
import { ViagemController } from './viagem.controller';
import { Viagem, ViagemSchema } from './schemas/viagem.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Viagem.name, schema: ViagemSchema }]),
  ],
  controllers: [ViagemController],
  providers: [ViagemService],
})
export class ViagemModule {}
