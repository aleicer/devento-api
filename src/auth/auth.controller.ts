import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto } from '@/auth/dto/createUser.dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {
  }

  @Get('register-email/:email')
  async create (@Res() res, @Param('email') email: string) {
    const save = await this.authService.createUserByEmail(email)
    return res.status(201).send(save)
  }

  @Post('register')
  async completeRegister (@Res() res, @Body() user: CreateUserDto) {
    const save = await this.authService.completeRegister(user._id, user)
    return res.status(201).send(save)
  }
}
