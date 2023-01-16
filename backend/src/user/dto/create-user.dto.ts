import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  fullname: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  password: string;
  @IsString()
  confirmPassword: string;
}
