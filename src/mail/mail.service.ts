import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(address: string, token: string) {
    const url = `http://localhost:3000/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: address,
      subject: 'Welcome to XCars! Confirm your Email',
      template: './confirmation',
      context: {
        url,
      },
    });
  }
}
