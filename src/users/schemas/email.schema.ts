import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailDocument = HydratedDocument<Email>;

@Schema({ versionKey: false, _id: false })
export class Email {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
