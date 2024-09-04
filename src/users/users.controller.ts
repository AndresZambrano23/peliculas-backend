import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() data: Register) {
    return this.usersService.register(data);
  }

  @Post('/login')
  async login(@Body() data: Login) {
    return this.usersService.login(data);
  }
}
