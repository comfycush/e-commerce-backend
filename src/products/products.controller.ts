import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getResponseFormat } from 'src/utils/misc';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('')
  async getProducts() {
    const products = await this.productsService.getList();
    return getResponseFormat(200, 'Product List', products);
  }
}
