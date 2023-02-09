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
import { Product } from './product.entity';
import { Variation } from './variation.entity';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'parent_id',
  })
  parentId: number;
  @ManyToOne(() => ProductCategory, (category) => category.id, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_id',
  })
  parent: ProductCategory;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Variation, (variation) => variation.category)
  variations: Variation[];
}
