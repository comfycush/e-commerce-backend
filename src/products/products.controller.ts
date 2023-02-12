import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParamDto } from 'src/utils/dto/param.dto';
import { getResponseFormat } from 'src/utils/misc';
import { CreateProductCategoryPayloadDto } from './dto/create-product-category-payload.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { UpdateProductCategoryPayloadDto } from './dto/update-product-category-payload.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts(@Query() query: GetProductsQueryDto) {
    const products = await this.productsService.getProductList(query);
    return getResponseFormat(200, 'Product List', products);
  }

  @Get('categories')
  async getCategoryList() {
    return getResponseFormat(
      200,
      'Product Category List',
      await this.productsService.getAllProductCategories(),
    );
  }

  @Post('category')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  async createCategory(@Body() payload: CreateProductCategoryPayloadDto) {
    return getResponseFormat(
      200,
      'Product Category created',
      await this.productsService.createProductCategory(payload),
    );
  }

  @Put('category/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  async updateCategory(
    @Param() { id }: ParamDto,
    @Body() payload: UpdateProductCategoryPayloadDto,
  ) {
    return getResponseFormat(
      200,
      'Product Category updated',
      await this.productsService.updateProductCategory(id, payload),
    );
  }
}
