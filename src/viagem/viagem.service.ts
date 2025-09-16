import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findAllViagens(): Promise<Viagem[]> {
    return this.viagemModel.find().populate('destinos').exec();
  }

  async findOneViagem(id: string): Promise<Viagem> {
    const v = await this.viagemModel.findById(id).populate('destinos').exec();
    if (!v) throw new NotFoundException('Viagem não encontrada');
    return v;
  }

  async updateViagem(id: string, payload: Partial<Viagem>): Promise<Viagem> {
    const v = await this.viagemModel
      .findByIdAndUpdate(id, payload, { new: true })
      .populate('destinos')
      .exec();
    if (!v) throw new NotFoundException('Viagem não encontrada');
    return v;
  }

  async removeViagem(id: string): Promise<void> {
    const res = await this.viagemModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Viagem não encontrada');
  }

  async addDestinoToViagem(
    viagemId: string,
    createDestinoDto: CreateDestinoDto,
  ): Promise<Viagem> {
    const viagem = await this.viagemModel.findById(viagemId).exec();
    if (!viagem) throw new NotFoundException('Viagem não encontrada');

    const novoDestino = new this.destinoModel(createDestinoDto);
    const savedDestino = await novoDestino.save();

    viagem.destinos.push(savedDestino._id as Types.ObjectId());
    await viagem.save();

    return this.viagemModel.findById(viagemId).populate('destinos').exec();
  }

  async removeDestinoFromViagem(
    viagemId: string,
    destinoId: string,
  ): Promise<Viagem> {
    const viagem = await this.viagemModel.findById(viagemId).exec();
    if (!viagem) throw new NotFoundException('Viagem não encontrada');

    viagem.destinos = viagem.destinos.filter(
      (d: any) => d.toString() !== destinoId,
    );
    await viagem.save();

    await this.destinoModel.findByIdAndDelete(destinoId).exec();

    return this.viagemModel.findById(viagemId).populate('destinos').exec();
  }
}
