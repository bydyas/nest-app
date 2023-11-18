import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';

import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }

    const isMatchPasswords = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isMatchPasswords) {
      throw new UnauthorizedException('Invalid email or password', {
        cause: new Error(),
        description: 'Unauthorized',
      });
    }

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const candidate = await this.usersService.findByEmail(signUpDto.email);
    if (candidate) {
      throw new BadRequestException('User with provided email already exists', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }

    const hashedPassword = await bcrypt.hash(
      signUpDto.password,
      parseInt(this.configService.get<string>('HASH_SALT'), 10),
    );
    const user = await this.usersService.create({
      email: {
        address: signUpDto.email,
        isVerified: false,
      },
      password: hashedPassword,
    });

    const payload = { sub: user._id };
    const access_token = await this.jwtService.signAsync(payload);

    await this.mailService.sendConfirmation(user, access_token);
    return {
      access_token,
    };
  }
}
