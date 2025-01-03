import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { AuthRepositoryService } from './authRepository.service'
import { EValidRoles } from '@/auth/constants'
import { IRegisterEmail, IUser } from '@/auth/interfaces'

@Injectable()
export class AuthService {
  constructor (
    private readonly authRepositoryService: AuthRepositoryService,
    private readonly jwtService: JwtService
  ) {}

  async createUserByEmail (email: string): Promise<IUser> {
    const formatEmail: string = email.trim().toLowerCase()
    const findEmail: IUser = await this.authRepositoryService.findUserByEmail(formatEmail)
    if (findEmail) throw new HttpException('El email ya existe por favor complete el regístro', 400)
    const newUser: IRegisterEmail = {
      email,
      roles: [EValidRoles.USER],
      isActive: false
    }
    return this.authRepositoryService.saveEmail(newUser)
  }

  async completeRegister (userId: string, user: IUser): Promise<IUser> {
    const { password } = user
    const foundUser: IUser = await this.authRepositoryService.findUserById(userId)
    user.password = bcrypt.hashSync(password, 10)
    user.isActive = true
    if (!foundUser) return this.authRepositoryService.createUser(user)
    return this.authRepositoryService.updateUser(userId, user)
  }
}
