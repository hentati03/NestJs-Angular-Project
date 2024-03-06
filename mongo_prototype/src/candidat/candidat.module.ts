import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CandidatController],
  providers: [CandidatService, JwtStrategy],
  imports: [JwtModule.register({}), PrismaModule],
})
export class CandidatModule {}
