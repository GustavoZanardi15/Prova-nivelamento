import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ViagemService } from './viagem.service';
import { ViagemController } from './viagem.controller';
import { Viagem, ViagemSchema } from './schemas/viagem.schemas';
import { Destino, DestinoSchema } from './schemas/destino.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Viagem.name, schema: ViagemSchema },
      { name: Destino.name, schema: DestinoSchema },
    ]),
  ],
  controllers: [ViagemController],
  providers: [ViagemService],
})
export class ViagemModule {}
