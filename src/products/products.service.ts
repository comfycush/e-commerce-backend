import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly userService: UsersService) {}

  async getList() {
    return this.userService.getList();
  }
}
