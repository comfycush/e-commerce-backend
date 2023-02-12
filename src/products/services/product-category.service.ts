import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCategoryPayloadDto } from '../dto/create-product-category-payload.dto';
import { UpdateProductCategoryPayloadDto } from '../dto/update-product-category-payload.dto';
import { ProductCategory } from '../entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productRepository: Repository<ProductCategory>,
  ) {}

  async getById(id: number): Promise<ProductCategory> {
    try {
      return this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<ProductCategory[]> {
    try {
      const builder = this.productRepository.createQueryBuilder('category');

      builder.leftJoinAndSelect('category.children', 'children');
      builder.andWhere('category.parentId IS NULL');

      return builder.getMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(
    payload: CreateProductCategoryPayloadDto,
  ): Promise<ProductCategory> {
    try {
      if (payload.parentId) {
        const parent = await this.getById(payload.parentId);

        if (!parent) {
          throw new BadRequestException('Parent not found');
        }
      }
      const productCategory = new ProductCategory();

      productCategory.name = payload.name;
      if (payload.parentId) {
        productCategory.parentId = payload.parentId;
      }
      productCategory.description = payload.description;

      return this.productRepository.save(productCategory);
    } catch (error) {
      if (error?.response?.statusCode === 400) {
        throw new BadRequestException(error.response.message);
      } else {
        throw new Error(error);
      }
    }
  }

  async update(id: number, payload: UpdateProductCategoryPayloadDto) {
    try {
      const productCategory = await this.productRepository.findOneBy({ id });

      productCategory.name = payload.name;
      if (payload.parentId) {
        productCategory.parentId = payload.parentId;
      }
      productCategory.description = payload.description;

      return this.productRepository.save(productCategory);
    } catch (error) {
      throw new Error(error);
    }
  }

  // async delete(id: number) {
  //   try {
  //     return this.productRepository.delete(id )
  //   } catch (error) {
  //     throw new Error(error);

  //   }
  // }
}
