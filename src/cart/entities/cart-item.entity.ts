import { ProductItem } from 'src/products/entities/product-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'cart_id',
  })
  cartId: number;
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: Cart;

  @Column({
    name: 'product_item_id',
  })
  productItemId: number;
  @ManyToOne(() => ProductItem, (productItem) => productItem.cartItems)
  @JoinColumn({
    name: 'product_item_id',
  })
  productItem: ProductItem;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
