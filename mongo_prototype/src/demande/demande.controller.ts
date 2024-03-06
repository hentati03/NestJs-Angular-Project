import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DemandeService } from './demande.service';

import { UpdateDemandeDto } from './dto/update-demande.dto';
import { JwtGuard } from 'src/candidat/guard';

@Controller('demandes')
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  @Get()
  getAllDemandes() {
    return this.demandeService.getAllDemandes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandeDto: UpdateDemandeDto) {
    return this.demandeService.update(+id, updateDemandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeService.remove(+id);
  }
}
