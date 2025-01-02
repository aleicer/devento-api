import { Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export class User {
  _id!: mongoose.Types.ObjectId

  @Prop({ required: true })
    firstName: string

  @Prop({ required: true })
    lastName: string

  @Prop()
    govId: string

  @Prop()
    govIdType: string

  @Prop()
    number: number

  @Prop()
    countryCode: string

  @Prop()
    email: string

  @Prop()
    password: string

  @Prop()
    role: string[]

  createdAt: Date
  updatedAt: Date
  __v: number
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
