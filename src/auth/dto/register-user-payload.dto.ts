import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserPayloadDto {
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
}
