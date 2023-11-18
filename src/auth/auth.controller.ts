import {
  Body,
  Controller,
  Post,
  Request,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    if (!signInDto.email || !signInDto.password) {
      throw new BadRequestException('Invalid email or password', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    if (!signUpDto.email || !signUpDto.password) {
      throw new BadRequestException('Invalid email or password', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('resend-email')
  resendEmailConfirmation(@Request() req: any, @Query() params: any) {
    if (!params.to) {
      throw new BadRequestException('Invalid email address', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }
    return this.authService.resendEmail({
      to: params.to,
      token: req.user.access_token,
    });
  }
}
