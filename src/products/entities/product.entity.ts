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
import { ProductCategory } from './product-category.entity';
import { ProductItem } from './product-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({
    name: 'category_id',
  })
  categoryId: number;
  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  category: ProductCategory;

  @OneToMany(() => ProductItem, (item) => item.product)
  items: ProductItem[];
}
