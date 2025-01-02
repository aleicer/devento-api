import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '@/auth/schemas/user.schema'
import { IUser } from '@/auth/interfaces'

@Injectable()
export class AuthRepositoryService {
  constructor (
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {
  }

  async findUserById (userId: string): Promise<IUser> {
    try {
      const user: User = await this.userModel.findById(userId).lean()
      return { ...user, _id: user._id.toString() }
    } catch (error) {
      throw new NotFoundException('User not found ', error)
    }
  }
}
