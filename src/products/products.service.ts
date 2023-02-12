import { Injectable } from '@nestjs/common';
import { PaginationTypeEnum } from 'nestjs-typeorm-paginate';
import { CreateProductCategoryPayloadDto } from './dto/create-product-category-payload.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { UpdateProductCategoryPayloadDto } from './dto/update-product-category-payload.dto';
import { ProductCategoryService } from './services/product-category.service';
import { ProductService } from './services/product.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async getProductList({
    page = 1,
    limit = 10,
    ...query
  }: GetProductsQueryDto) {
    return this.productService.getProducts(
      {
        page,
        limit,
        paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      },
      query.search,
      query.category,
      query.orderBy,
      query.order === 'asc' ? 'ASC' : 'DESC',
    );
  }

  async getAllProductCategories() {
    return this.productCategoryService.getAll();
  }

  async createProductCategory(payload: CreateProductCategoryPayloadDto) {
    return this.productCategoryService.create(payload);
  }

  async updateProductCategory(
    id: number,
    payload: UpdateProductCategoryPayloadDto,
  ) {
    return this.productCategoryService.update(id, payload);
  }
}
