import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductItem } from './product-item.entity';
import { VariationOption } from './variation-option.entity';

@Entity('product_configurations')
export class ProductConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'product_item_id',
  })
  productItemId: number;
  @ManyToOne(
    () => ProductItem,
    (productItem) => productItem.productConfigurations,
  )
  @JoinColumn({
    name: 'product_item_id',
  })
  productItem: ProductItem;

  @Column({
    name: 'variation_option_id',
  })
  variationOptionId: number;
  @ManyToOne(
    () => VariationOption,
    (variationOption) => variationOption.productConfigurations,
  )
  @JoinColumn({
    name: 'variation_option_id',
  })
  variationOption: VariationOption;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
