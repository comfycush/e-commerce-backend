import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../constants';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phoneNumber: string;

  @IsEnum(Role, {
    message: '$property must be one of ' + Object.values(Role).join(', ') + '.',
  })
  readonly role: Role;
}
