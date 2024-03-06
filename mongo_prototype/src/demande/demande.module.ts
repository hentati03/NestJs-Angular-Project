import { Module } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/candidat/strategy';

@Module({
  controllers: [DemandeController],
  providers: [DemandeService, JwtStrategy],
  imports: [JwtModule.register({}), PrismaModule],
})
export class DemandeModule {}
