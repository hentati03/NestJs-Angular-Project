import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninCandidatDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
