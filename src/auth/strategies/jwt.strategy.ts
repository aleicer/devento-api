import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { AuthRepositoryService } from '@/auth/authRepository.service'
import { IJwtPayload, IUser } from '@/auth/interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly authRepositoryService: AuthRepositoryService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('TOKEN_SECRET')
    })
  }

  async validate (payload: IJwtPayload): Promise<IUser> {
    const { userId } = payload
    const user: IUser = await this.authRepositoryService.findUserById(userId)
    if (!user) throw new UnauthorizedException('Token is not valid')
    if (user.isActive) throw new UnauthorizedException('User is inactive, talk with an admin')
    return user
  }
}
