import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Brackets, Repository, UpdateResult } from 'typeorm';
import { Role } from '../constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { findByUsernameParams } from '../types/params';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.userRepository.count();

    if (count === 0) {
      await this.create({
        username: 'masteradmin',
        email: 'admin@commerce.com',
        password: 'password123',
        firstName: 'Master',
        lastName: 'Admin',
        phoneNumber: '0812312312',
        role: Role.ADMIN,
      });
    }
  }

  async getList(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id: number): Promise<User> {
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmailOrUsername({
    role,
    username,
  }: findByUsernameParams): Promise<User> {
    try {
      const query = {};

      if (username.includes('@')) {
        query['email'] = username;
      } else {
        if (username) {
          query['username'] = username;
        }
      }
      query['role'] = role;

      return this.userRepository.findOneBy(query);
    } catch (error) {
      throw Error(error);
    }
  }

  async checkByUsername(username: string) {
    try {
      return this.userRepository.findOneBy({ username });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const user = new User();

      user.username = payload.username;
      user.email = payload.email;
      user.password = payload.password;
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.phoneNumber = payload.phoneNumber;
      user.role = payload.role;

      // hash user password
      const salt = genSaltSync(10);
      user.password = hashSync(payload.password, salt);

      return this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (user.username !== payload.username) {
        const checkUsername = await this.checkByUsername(payload.username);

        if (checkUsername) {
          throw new BadRequestException('Username already used.');
        } else {
          user.username = payload.username;
        }
      }

      if (user.email !== payload.email) {
        const checkEmail = await this.userRepository.findBy({
          email: payload.email,
        });

        if (checkEmail) {
          throw new BadRequestException('Email already used');
        } else {
          user.email = payload.email;
        }
      }

      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.phoneNumber = payload.phoneNumber;

      return this.userRepository.save(user);
    } catch (error) {
      if (error?.response?.statusCode === 400) {
        throw new BadRequestException(error.response.message);
      } else {
        throw new Error(error);
      }
    }
  }

  async updateUserCart(id: number, cartId: number): Promise<UpdateResult> {
    return this.userRepository.update(id, {
      cartId,
    });
  }

  async getUsersByRole(
    role: Role,
    options: IPaginationOptions,
    search: string,
    orderBy = 'created',
    order: 'DESC' | 'ASC' = 'DESC',
  ) {
    try {
      const builder = this.userRepository.createQueryBuilder('user');
      builder.where('user.role = :role', { role });
      if (search) {
        builder.andWhere(
          new Brackets((qb) => {
            qb.orWhere('user.email LIKE :email', {
              email: `%${search}%`,
            }).orWhere('user.username LIKE :username', {
              username: `%${search}%`,
            });
          }),
        );
      }
      builder.orderBy('user.' + orderBy), order;

      return paginate<User>(builder, options);
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeUserStatus(id: number, status: boolean) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      user.status = status;
      return this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
