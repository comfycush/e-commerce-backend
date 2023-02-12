import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { findByUsernameParams } from '../types/params';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
      if (role) {
        query['role'] = role;
      }

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
}
