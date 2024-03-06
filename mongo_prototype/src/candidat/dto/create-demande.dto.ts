import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateDemandeDto {
  @IsNotEmpty()
  @MaxLength(300)
  lettreMotivation: string;

  @IsNotEmpty()
  @IsString()
  offreId: string;
}
