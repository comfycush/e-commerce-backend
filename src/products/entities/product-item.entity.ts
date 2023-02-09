import { CartItem } from 'src/cart/entities/cart-item.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
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
import { Discount } from './discount.entity';
import { ProductConfiguration } from './product-configuration.entity';
import { Product } from './product.entity';

@Entity('product_items')
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'product_id',
  })
  productId: number;
  @ManyToOne(() => Product, (product) => product.items)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @Column({
    name: 'discount_id',
  })
  discountId: number;
  @ManyToOne(() => Discount, (discount) => discount.productItems)
  @JoinColumn({
    name: 'discount_id',
  })
  discount: Discount;

  @Column()
  sku: string;

  @Column({
    name: 'qty_in_stock',
  })
  qty: number;

  @Column({
    name: 'product_image',
  })
  image: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(
    () => ProductConfiguration,
    (productConfiguration) => productConfiguration.productItem,
  )
  productConfigurations: ProductConfiguration[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.productItem)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productItem)
  orderItems: OrderItem[];
}
