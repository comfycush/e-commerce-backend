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
import { VariationOption } from './variation-option.entity';

@Entity('variations')
export class Variation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'category_id',
  })
  categoryId: number;
  @ManyToOne(() => ProductCategory, (category) => category.variations)
  @JoinColumn({
    name: 'category_id',
  })
  category: ProductCategory;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => VariationOption, (option) => option.variation)
  options: VariationOption[];
}
