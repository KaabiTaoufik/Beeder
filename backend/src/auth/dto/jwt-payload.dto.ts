import { IsEmail } from 'class-validator';

export class JwtPayloadDto {
  @IsEmail()
  email: string;
}
