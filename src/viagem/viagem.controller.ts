import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ViagemService } from './viagem.service';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { NOMEM } from 'dns';

@Controller('viagens')
export class ViagemController {
  constructor(private readonly viagensService: ViagemService) {}

  @Post()
  createViagem(@Body() payload: any) {
    return this.viagensService.createViagem(payload);
  }

  @Get()
  findAll() {
    return this.viagensService.findAllViagens();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viagensService.findOneViagem(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.viagensService.updateViagem(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viagensService.removeViagem(id);
  }

  @Post(':id/destinos')
  addDestino(
    @Param('id') id: string,
    @Body() createDestinoDto: CreateDestinoDto,
  ) {
    return this.viagensService.addDestinoToViagem(id, createDestinoDto);
  }

  @Delete(':id/destinos/:destinoId')
  removeDestino(
    @Param('id') id: string,
    @Param('destinoId') destinoId: string,
  ) {
    return this.viagensService.removeDestinoFromViagem(id, destinoId);
  }
}
