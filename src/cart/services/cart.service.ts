import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from '../dto/create-cart.dto';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(payload: CreateCartDto): Promise<Cart> {
    try {
      const cart = new Cart();

      cart.userId = payload.userId;

      return this.cartRepository.save(cart);
    } catch (error) {
      throw new Error(error);
    }
  }
}
