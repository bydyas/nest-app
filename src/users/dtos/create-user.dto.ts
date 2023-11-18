import { Email } from '../schemas/email.schema';

export class CreateUserDto {
  readonly email: Email;
  readonly password: string;
}
