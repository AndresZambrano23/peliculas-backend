import { Injectable } from '@nestjs/common';
import { Register } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Credential } from 'src/credentials/entities/credential.entity';
import { Login } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const DATA_NOT_FOUND = 'DATA_NOT_FOUND';
const USER_NOT_FOUND = 'USER_NOT_FOUND';
const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    private jwtService: JwtService,
  ) {}

  async register(data: Register) {
    if (
      !data ||
      !data.email ||
      !data.lastname ||
      !data.name ||
      !data.password
    ) {
      return {
        response: false,
        body: DATA_NOT_FOUND,
      };
    }
    const password = data.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const userData = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
    };
    const userCreate = this.userRepository.create(userData);
    const user = await this.userRepository.save(userCreate);
    const credentialsData = {
      userId: {
        id: user.id,
      },
      password: hash,
    };
    const credentialCreate = this.credentialRepository.create(credentialsData);
    await this.credentialRepository.save(credentialCreate);
    return {
      response: true,
      body: null,
    };
  }

  async login(data: Login) {
    if (!data || !data.email || !data.password) {
      return {
        response: false,
        body: DATA_NOT_FOUND,
      };
    }
    const email = data.email;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['credentialId'],
    });
    if (!user) {
      return {
        response: false,
        body: USER_NOT_FOUND,
      };
    }
    const password = data.password;
    const isMatch = await bcrypt.compare(password, user.credentialId.password);
    if (!isMatch) {
      return {
        response: false,
        body: USER_NOT_FOUND,
      };
    }
    const payload = { sub: user.id, username: user.name };
    const token = await this.jwtService.signAsync(payload);
    const body = {
      user: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    };
    return {
      response: true,
      body: body,
    };
  }
}
