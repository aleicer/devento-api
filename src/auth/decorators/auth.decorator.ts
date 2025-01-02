import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from '../guards/user-role.guard'
import { EValidRoles } from '../constants'
import { RoleProtected } from './role-protected.decorator'

export function Auth (...roles: EValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard)
  )
}
