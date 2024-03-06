import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatModule } from './candidat/candidat.module';
import { ConfigModule } from '@nestjs/config';
import { DemandeModule } from './demande/demande.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CandidatModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DemandeModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
