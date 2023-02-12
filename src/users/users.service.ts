import { Injectable } from '@nestjs/common';
import { PaginationTypeEnum } from 'nestjs-typeorm-paginate';
import { CartsService } from 'src/cart/carts.service';
import { Role } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { findByUsernameParams } from './types/params';

@Injectable()
export class UsersService {
  constructor(
    private userService: UserService,
    private cartsService: CartsService,
  ) {}

  async getById(userId: number) {
    return this.userService.getById(userId);
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = await this.userService.create(payload);

    if (user.role === Role.CUSTOMER) {
      const cart = await this.cartsService.create({ userId: user.id });
      await this.userService.updateUserCart(user.id, cart.id);
    }

    return user;
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    return this.userService.update(id, payload);
  }

  async checkByUsername(username: string) {
    return this.userService.checkByUsername(username);
  }

  async findByEmailOrUsername(payload: findByUsernameParams): Promise<User> {
    return this.userService.findByEmailOrUsername(payload);
  }

  async getUsersByRole(
    role: Role,
    { page = 1, limit = 10, ...query }: GetUsersQueryDto,
  ) {
    return this.userService.getUsersByRole(
      role,
      {
        page,
        limit,
        paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      },
      query.search,
      query.orderBy,
      query.order === 'asc' ? 'ASC' : 'DESC',
    );
  }
  async changeUserStatus(id: number, status: boolean) {
    return this.userService.changeUserStatus(id, status);
  }
}
