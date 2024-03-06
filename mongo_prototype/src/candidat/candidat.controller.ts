import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Request,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ExecutionContext,
  Req,
} from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { SigninCandidatDto } from './dto/signin-candidat.dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { Candidat } from '@prisma/client';
import { CreateDemandeDto } from './dto/create-demande.dto';

@Controller('candidats')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Post('signup')
  create(@Body() dto: CreateCandidatDto) {
    return this.candidatService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninCandidatDto) {
    return this.candidatService.signin(dto);
  }
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() candidat: Candidat) {
    return candidat;
  }

  @Patch('profile')
  @UseGuards(JwtGuard) // Apply the JwtAuthGuard to this route
  async updateProfile(
    @Req() req: any, // Inject the request object
    @Body() updateCandidatDto: UpdateCandidatDto,
  ) {
    // Extract user id from the authenticated user's token
    const userId = req.user.id;

    // Call the updateCandidat method with the extracted userId
    return this.candidatService.updateCandidat(userId, updateCandidatDto);
  }

  @Post('demande')
  @UseGuards(JwtGuard) // Protect the route with JWT authentication
  async createDemande(
    @Body() createDemandeDto: CreateDemandeDto,
    @Request() req: any,
  ) {
    // Pass ExecutionContext to the service
    return await this.candidatService.createDemande(createDemandeDto, req);
  }
}
