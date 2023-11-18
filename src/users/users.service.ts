import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await new this.userModel(createUserDto).save();
  }

  async findByEmail(emailAddress: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      email: {
        address: emailAddress,
      },
    });
  }
}
