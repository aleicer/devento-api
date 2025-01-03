import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User {
  _id!: mongoose.Types.ObjectId

  @Prop()
    firstName: string

  @Prop()
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

  @Prop({ required: true, trim: true, lowercase: true })
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
