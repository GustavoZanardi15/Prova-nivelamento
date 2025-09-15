import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Viagem, ViagemDocument } from './schemas/viagem.schemas';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateViagemDto } from './dto/update-viagem.dto';

@Injectable()
export class ViagemService {
  constructor(
    @InjectModel(Viagem.name) private viagemModel: Model<ViagemDocument>,
  ) {}

  async create(createViagemDto: CreateViagemDto): Promise<Viagem> {
    const created = new this.viagemModel(createViagemDto);
    return created.save();
  }

  async findAll(): Promise<Viagem[]> {
    return this.viagemModel.find().exec();
  }

  async findOne(id: string): Promise<Viagem> {
    const viagem = await this.viagemModel.findById(id).exec();
    if (!viagem) throw new NotFoundException('Viagem não encontrada');
    return viagem;
  }

  async update(id: string, updateDto: UpdateViagemDto): Promise<Viagem> {
    const viagem = await this.viagemModel
      .findByIdAndUpdate(id, updateDto, {
        new: true,
      })
      .exec();
    if (!viagem) throw new NotFoundException('Viagem não encontrada');
    return viagem;
  }

  async remove(id: string): Promise<void> {
    const res = await this.viagemModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Viagem não encontrada');
  }
}
