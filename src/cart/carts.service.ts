import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartService } from './services/cart.service';

@Injectable()
export class CartsService {
  constructor(private readonly cartService: CartService) {}

  async create(payload: CreateCartDto) {
    return this.cartService.create(payload);
  }
}
