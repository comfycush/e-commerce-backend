import { Injectable } from '@nestjs/common';
import { ProductService } from './services/product.service';

@Injectable()
export class ProductsService {
  constructor(private readonly productService: ProductService) {}

  async getList() {
    return this.productService.getProducts();
  }
}
