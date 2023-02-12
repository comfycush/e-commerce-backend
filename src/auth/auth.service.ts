import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Role } from './constants';
import { RegisterUserPayloadDto } from './dto/register-user-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerCustomer(payload: RegisterUserPayloadDto): Promise<User> {
    const registeredUser = await this.usersService.checkByUsername(
      payload.username,
    );

    if (registeredUser) {
      throw new BadRequestException('Username already exists');
    }

    return this.usersService.create({ role: Role.CUSTOMER, ...payload });
  }

  async generateAuthToken(username: string, role: Role): Promise<string> {
    return this.jwtService.sign({
      username,
      role,
    });
  }

  async validateUser(
    username: string,
    password: string,
    role: Role,
  ): Promise<User> {
    const user = await this.usersService.findByEmailOrUsername({
      username,
      role,
    });

    if (!user) {
      throw new BadRequestException('Password or email are incorrect');
    }

    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      throw new BadRequestException('Password or email are incorrect');
    }

    if (!user.status) {
      throw new BadRequestException('Account is inactive');
    }

    return user;
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
