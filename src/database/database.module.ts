import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'e-commerce-fadhil',
      autoLoadEntities: true,
      synchronize: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   // name: 'db_read',
    //   useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    //     type: 'mysql',
    //     host: configService.get<string>('database.host'),
    //     port: configService.get<number>('database.port'),
    //     username: configService.get<string>('database.username'),
    //     password: configService.get<string>('database.password'),
    //     database: configService.get<string>('database.database'),
    //     synchronize: true,
    //     charset: 'utf8mb4',
    //     // logging: true,
    //   }),
    // }),

    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   name: 'db_read',
    //   useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    //     type: 'mysql',
    //     host: configService.get<string>('database.host'),
    //     port: configService.get<number>('database.port'),
    //     username: configService.get<string>('database.username'),
    //     password: configService.get<string>('database.password'),
    //     database: configService.get<string>('database.database'),
    //     synchronize: true,
    //     charset: 'utf8mb4',
    //     logging: true,
    //   }),
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   name: 'db_write',
    //   useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    //     type: 'mysql',
    //     host: configService.get<string>('database.host'),
    //     port: configService.get<number>('database.port'),
    //     username: configService.get<string>('database.username'),
    //     password: configService.get<string>('database.password'),
    //     database: configService.get<string>('database.database'),
    //     synchronize: true,
    //     charset: 'utf8mb4',
    //     logging: true,
    //   }),
    // }),
  ],
  exports: [],
})
export class DatabaseModule {}
