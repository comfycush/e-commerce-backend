import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { findByUsernameParams } from './types/params';

@Injectable()
export class UsersService {
  constructor(private userService: UserService) {}

  async create(payload: CreateUserDto): Promise<User> {
    return this.userService.create(payload);
  }

  async checkByUsername(username: string) {
    return this.userService.checkByUsername(username);
  }

  async findByEmailOrUsername(payload: findByUsernameParams): Promise<User> {
    return this.userService.findByEmailOrUsername(payload);
  }
}
