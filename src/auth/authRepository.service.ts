import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '@/auth/schemas/user.schema'
import { IRegisterEmail, IUser } from '@/auth/interfaces'

@Injectable()
export class AuthRepositoryService {
  constructor (
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {
  }

  async findUserById (userId: string): Promise<IUser> {
    try {
      const user: User = await this.UserModel.findById(userId).lean()
      return { ...user, _id: user._id.toString() }
    } catch (error) {
      throw new NotFoundException('User not found ', error)
    }
  }

  async findUserByEmail (email: string): Promise<IUser> {
    try {
      const user: User = await this.UserModel.findOne({ email }).lean()
      if (!user) return null
      return { ...user, _id: user._id.toString() }
    } catch (error) {
      throw new NotFoundException('User not found ', error)
    }
  }

  async createUser (user: IUser): Promise<IUser> {
    try {
      const newUser: User = await new this.UserModel(user).save()
      return { ...newUser, _id: newUser._id.toString(), password: null }
    } catch (error) {
      throw new HttpException('Error creating user', error)
    }
  }

  async saveEmail (registerEmail: IRegisterEmail): Promise<IUser> {
    try {
      const user: User = await new this.UserModel(registerEmail)
        .save()
        .then(doc => doc.toObject())
      return { ...user, _id: user._id.toString() }
    } catch (error) {
      throw new HttpException('Error saving email', error)
    }
  }

  async updateUser (userId: string, user: IUser): Promise<IUser> {
    try {
      const updatedUser: User = await this.UserModel.findByIdAndUpdate(
        userId,
        user,
        { new: true, select: '-password -__v' }
      ).lean()
      return { ...updatedUser, _id: updatedUser._id.toString() }
    } catch (error) {
      throw new HttpException('Error updating user', error)
    }
  }
}
