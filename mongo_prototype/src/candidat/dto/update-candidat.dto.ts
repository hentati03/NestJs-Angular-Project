import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidatDto } from './create-candidat.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCandidatDto extends PartialType(CreateCandidatDto) {
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  roleDesired?: string;
}
