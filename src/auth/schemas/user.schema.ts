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
    isActive: boolean

  @Prop({ required: true })
    email: string

  @Prop()
    password: string

  @Prop()
    roles: string[]

  createdAt: Date
  updatedAt: Date
  __v: number
}

export type UserDocument = User & Document
const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ govId: 1, govIdType: 1 }, { unique: true })
export { UserSchema }
