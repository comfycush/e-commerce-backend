import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(
    options: IPaginationOptions,
    search: string,
    category = '0',
    orderBy = 'created',
    order: 'DESC' | 'ASC' = 'DESC',
  ): Promise<Pagination<Product>> {
    try {
      const builder = this.productRepository.createQueryBuilder('product');
      builder.leftJoinAndSelect('product.category', 'category');

      if (search) {
        builder.andWhere('product.name LIKE :search', {
          search: `%${search}%`,
        });
      }

      // category 0 means all
      if (category !== '0') {
        builder.select('product.id');
        builder.andWhere('category.id = :category', { category });
      }

      builder.orderBy('product.created' + orderBy, order);

      return paginate<Product>(builder, options);
    } catch (error) {
      throw new Error(error);
    }
  }
}
