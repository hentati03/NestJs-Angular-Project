import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SigninCandidatDto } from './dto/signin-candidat.dto';
import { CreateDemandeDto } from './dto/create-demande.dto';

@Injectable()
export class CandidatService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Create / SignUp

  async create(dto: CreateCandidatDto) {
    const hash = await argon.hash(dto.password);
    try {
      const candidat = await this.prisma.candidat.create({
        data: {
          email: dto.email,
          hash,
          location: dto.location,
          firstName: dto.firstName,
          lastName: dto.lastName,
          roleDesired: dto.roleDesired,
        },
      });
      console.log({
        candidat: candidat,
      });

      return {
        candidat: candidat,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  // Update Candidat

  async updateCandidat(id: string, dto: UpdateCandidatDto) {
    try {
      // Check if the candidat with the given id exists
      const existingCandidat = await this.prisma.candidat.findUnique({
        where: { id },
      });

      // If candidat doesn't exist, throw an exception
      if (!existingCandidat) {
        throw new NotFoundException('Candidat not found');
      }

      // If password is provided in the DTO, hash it
      let hash;
      if (dto.password) {
        hash = await argon.hash(dto.password);
      }

      // Update candidat with the provided data
      const updatedCandidat = await this.prisma.candidat.update({
        where: { id },
        data: {
          email: dto.email || existingCandidat.email,
          hash: hash || existingCandidat.hash,
          location: dto.location || existingCandidat.location,
          firstName: dto.firstName || existingCandidat.firstName,
          lastName: dto.lastName || existingCandidat.lastName,
          roleDesired: dto.roleDesired || existingCandidat.roleDesired,
        },
      });

      return { candidat: updatedCandidat };
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  //Create Token

  async signToken(
    candidatId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: candidatId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '3 h',
      secret: secret,
    });
    console.log({
      access_token: token,
    });

    return {
      access_token: token,
    };
  }

  // SignIn

  async signin(dto: SigninCandidatDto) {
    // find the candidat by email
    const candidat = await this.prisma.candidat.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if candidat does not exist throw exception
    if (!candidat) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(candidat.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(candidat.id, candidat.email);
  }

  async createDemande(dto: CreateDemandeDto, @Request() request: any) {
    // Extracting user ID from the bearer token

    const userId = request.user.id;
    console.log(userId);

    try {
      const createdDemande = await this.prisma.demande.create({
        data: {
          lettreMotivation: dto.lettreMotivation,
          offreId: dto.offreId,
          authorId: userId, // Assigning the user ID to authorId
        },
      });
      return {
        demande: createdDemande,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
