import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email.address,
      subject: 'Welcome to XCars! Confirm your Email',
      template: './confirmation',
      context: {
        url,
      },
    });
  }
}
