import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductConfiguration } from './product-configuration.entity';
import { Variation } from './variation.entity';

@Entity('variation_options')
export class VariationOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'variation_id',
  })
  variationId: number;
  @ManyToOne(() => Variation, (variation) => variation.options)
  @JoinColumn({
    name: 'variation_id',
  })
  variation: Variation;

  @Column()
  value: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(
    () => ProductConfiguration,
    (productConfiguration) => productConfiguration.variationOption,
  )
  productConfigurations: ProductConfiguration[];
}
