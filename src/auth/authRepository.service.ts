import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '@/auth/schemas/user.schema'

@Injectable()
export class AuthRepositoryService {
  constructor (
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {
  }
}
