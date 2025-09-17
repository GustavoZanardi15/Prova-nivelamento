import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PopulatedDoc, Document } from 'mongoose';
import { Viagem, ViagemDocument } from './schemas/viagem.schemas';
import { Destino, DestinoDocument } from './schemas/destino.schemas';
import { CreateDestinoDto } from './dto/create-destino.dto';

@Injectable()
export class ViagemService {
  constructor(
    @InjectModel(Viagem.name) private viagemModel: Model<ViagemDocument>,
    @InjectModel(Destino.name) private destinoModel: Model<DestinoDocument>,
  ) {}

  async createViagem(payload: Partial<Viagem>): Promise<Viagem> {
    const v = new this.viagemModel(payload);
    return v.save();
  }

  async findAllViagens(): Promise<
    PopulatedDoc<Viagem & Document, 'destinos'>[]
  > {
    return this.viagemModel.find().populate('destinos').exec() as Promise<
      PopulatedDoc<Viagem & Document, 'destinos'>[]
    >;
  }

  async findOneViagem(
    id: string,
  ): Promise<PopulatedDoc<Viagem & Document, 'destinos'>> {
    const v = await this.viagemModel.findById(id).populate('destinos').exec();
    if (!v) throw new NotFoundException('Viagem não encontrada');
    return v as PopulatedDoc<Viagem & Document, 'destinos'>;
  }

  async updateViagem(
    id: string,
    payload: Partial<Viagem>,
  ): Promise<PopulatedDoc<Viagem & Document, 'destinos'>> {
    const v = await this.viagemModel
      .findByIdAndUpdate(id, payload, { new: true })
      .populate('destinos')
      .exec();
    if (!v) throw new NotFoundException('Viagem não encontrada');
    return v as PopulatedDoc<Viagem & Document, 'destinos'>;
  }

  async removeViagem(id: string): Promise<void> {
    const res = await this.viagemModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Viagem não encontrada');
  }

  async addDestinoToViagem(
    viagemId: string,
    createDestinoDto: CreateDestinoDto,
  ): Promise<PopulatedDoc<Viagem & Document, 'destinos'>> {
    const viagem = await this.viagemModel.findById(viagemId).exec();
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }

    const novoDestino = new this.destinoModel(createDestinoDto);
    const savedDestino = await novoDestino.save();

    viagem.destinos.push(savedDestino._id as unknown as Destino);
    await viagem.save();

    const populatedViagem = await this.viagemModel
      .findById(viagemId)
      .populate('destinos')
      .exec();

    if (!populatedViagem) {
      throw new NotFoundException('Viagem não encontrada após a atualização');
    }

    return populatedViagem as PopulatedDoc<Viagem & Document, 'destinos'>;
  }

  async removeDestinoFromViagem(
    viagemId: string,
    destinoId: string,
  ): Promise<PopulatedDoc<Viagem & Document, 'destinos'>> {
    const viagem = await this.viagemModel.findById(viagemId).exec();
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }

    await this.viagemModel
      .updateOne(
        { _id: viagemId },
        { $pull: { destinos: new Types.ObjectId(destinoId) } },
      )
      .exec();

    await this.destinoModel.findByIdAndDelete(destinoId).exec();

    const populatedViagem = await this.viagemModel
      .findById(viagemId)
      .populate('destinos')
      .exec();

    if (!populatedViagem) {
      throw new NotFoundException(
        'Viagem não encontrada após remoção do destino.',
      );
    }

    return populatedViagem as PopulatedDoc<Viagem & Document, 'destinos'>;
  }
}
