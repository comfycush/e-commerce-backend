import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { CartService } from './services/cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([CartItem]),
  ],
  controllers: [CartsController],
  providers: [CartsService, CartService],
  exports: [CartsService],
})
export class CartsModule {}
