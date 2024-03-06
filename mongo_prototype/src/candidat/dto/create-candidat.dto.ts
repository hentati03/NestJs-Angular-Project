import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCandidatDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;


  @IsString()
  roleDesired: string;
}
