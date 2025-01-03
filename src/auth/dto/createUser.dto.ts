import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt, IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

export class CreateUserDto {
  @IsMongoId()
    _id: string

  @IsString()
  @IsEmail()
    email: string

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string

  @IsString()
  @MinLength(3)
    firstName: string

  @IsString()
  @MinLength(3)
    lastName: string

  @IsString()
  @IsOptional()
    govId: string

  @IsString()
  @IsOptional()
    govIdType: string

  @IsInt()
    number: number

  @IsString()
    countryCode: string

  @IsBoolean()
  @IsOptional()
    isActive: boolean

  @IsArray()
    roles: string[]
}
