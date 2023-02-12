import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Address]),

    // TypeOrmModule.forFeature([User], 'db_read'),
    // TypeOrmModule.forFeature([User], 'db_write'),
  ],
  providers: [UsersService, UserService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
