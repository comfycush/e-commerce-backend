import { Controller, Get } from '@nestjs/common';
import { getResponseFormat } from 'src/utils/misc';
import { ProductsService } from './services/product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('')
  async getProducts() {
    const products = await this.productsService.getProducts();
    return getResponseFormat(200, 'Product List', products);
  }
}
