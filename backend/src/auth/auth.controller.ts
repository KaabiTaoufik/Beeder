import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const user = await this.authService.register(createUserDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (exception) {
      return res.status(HttpStatus.BAD_REQUEST).json(exception.message);
    }
  }
  @Post('login')
  async login(@Body() credentialsDto: CreateUserDto, @Res() res) {
    try {
      const data = await this.authService.validate(credentialsDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (exception) {
      return res.status(HttpStatus.BAD_REQUEST).json(exception.message);
    }
  }
}
