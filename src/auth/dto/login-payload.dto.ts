import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Role } from '../constants';

export class LoginPayloadDto {
  @ApiProperty()
  @IsOptional()
  @ValidateIf(({ email }) => !email)
  readonly username?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateIf(({ username }) => !username)
  readonly email?: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsEnum(Role, {
    message: '$property must be one of ' + Object.values(Role).join(', ') + '.',
  })
  readonly role?: Role;
}
