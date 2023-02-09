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
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'product_item_id',
  })
  productItemId: number;
  @ManyToOne(() => ProductItem, (productItem) => productItem.orderItems)
  @JoinColumn({
    name: 'product_item_id',
  })
  productItem: ProductItem;

  @Column({
    name: 'order_id',
  })
  orderId: number;
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @Column()
  qty: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
