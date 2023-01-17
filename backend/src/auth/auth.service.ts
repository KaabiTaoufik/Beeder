import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from "./dto/credentials.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirmPassword)
      throw new HttpException(
        'Passwords do not match.',
        HttpStatus.BAD_REQUEST,
      );
    if (await this.userService.emailExists(createUserDto.email))
      throw new HttpException('Email already exists.', HttpStatus.BAD_REQUEST);
    if (await this.userService.phoneNumberExists(createUserDto.phoneNumber))
      throw new HttpException('Number already exists.', HttpStatus.BAD_REQUEST);
    const user = await this.userService.create(createUserDto);
    delete user.password;
    delete user.salt;
    return user;
  }
  async validate(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto;
    if (!(await this.userService.emailExists(email)))
      throw new HttpException(
        'Verifiy your credentials',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userService.getUserByEmail(email);
    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException(
        'Verifiy your credentials',
        HttpStatus.BAD_REQUEST,
      );
    const payload: JwtPayloadDto = { email: user.email };
    const jwt = this.jwtService.sign(payload);
    delete user.password;
    delete user.salt;
    return {
      token: jwt,
      user,
    };
  }
}
