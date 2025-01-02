import { SetMetadata } from '@nestjs/common'
import { EValidRoles } from '../constants'

export const META_ROLES = 'roles'

export const RoleProtected = (...args: EValidRoles[]) => {
  return SetMetadata(META_ROLES, args)
}
