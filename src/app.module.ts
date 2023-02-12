import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { AccessLogMiddleware } from './logger/logger.middleware';
import { TerminusModule } from '@nestjs/terminus';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1,
      ignoreUserAgents: [/googlebot/gi, new RegExp('bingbot', 'gi')],
    }),

    DatabaseModule,
    UsersModule,
    TerminusModule,
    ProductsModule,
    CartModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessLogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
