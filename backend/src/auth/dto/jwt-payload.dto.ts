import { IsEmail } from 'class-validator';

export class JwtPayloadDto {
  username: string;
  password: string;
}
