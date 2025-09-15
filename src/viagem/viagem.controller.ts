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
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateViagemDto } from './dto/update-viagem.dto';

@Controller('viagens')
export class ViagemController {
  constructor(private readonly ViagemService: ViagemService) {}

  @Post()
  create(@Body() createViagemDto: CreateViagemDto) {
    return this.ViagemService.create(createViagemDto);
  }

  @Get()
  findAll() {
    return this.ViagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ViagemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateViagemDto: UpdateViagemDto) {
    return this.ViagemService.update(id, updateViagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ViagemService.remove(id);
  }
}
