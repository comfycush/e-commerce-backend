import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductItem } from './entities/product-item.entity';
import { Variation } from './entities/variation.entity';
import { ProductsController } from './products.controller';
import { VariationOption } from './entities/variation-option.entity';
import { ProductConfiguration } from './entities/product-configuration.entity';
import { Discount } from './entities/discount.entity';
import { ProductService } from './services/product.service';
import { ProductsService } from './products.service';
import { ProductCategoryService } from './services/product-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductCategory]),
    TypeOrmModule.forFeature([Variation]),
    TypeOrmModule.forFeature([ProductItem]),
    TypeOrmModule.forFeature([VariationOption]),
    TypeOrmModule.forFeature([ProductConfiguration]),
    TypeOrmModule.forFeature([Discount]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductService, ProductCategoryService],
})
export class ProductsModule {}
