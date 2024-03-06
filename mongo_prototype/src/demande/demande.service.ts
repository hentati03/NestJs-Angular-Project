import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Demande } from '@prisma/client';

@Injectable()
export class DemandeService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async getAllDemandes(): Promise<Demande[]> {
    return await this.prisma.demande.findMany(); // Retrieve all demandes from the database
  }

  findOne(id: number) {
    return `This action returns a #${id} demande`;
  }

  update(id: number, updateDemandeDto: UpdateDemandeDto) {
    return `This action updates a #${id} demande`;
  }

  remove(id: number) {
    return `This action removes a #${id} demande`;
  }
}
