import { Reflector } from '@nestjs/core'
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { IUser } from '@/auth/interfaces'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector
  ) {
  }

  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get<string[]>('roles', context.getHandler())
    if (!validRoles) return true
    if (validRoles.length === 0) return true
    const request = context.switchToHttp().getRequest()
    const user: IUser = request.user as IUser
    if (!user) throw new BadRequestException('User not found')
    for (const role of user.roles) {
      if (validRoles.includes(role)) return true
    }
    throw new BadRequestException(`User ${user.firstName} need a valid role: [${validRoles}]`)
  }
}
