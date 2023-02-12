import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../constants';
import { Address } from './address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    name: 'role',
    type: 'enum',
    nullable: false,
    enum: Role,
  })
  role: Role;

  @Column({
    default: true,
  })
  status: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @Column({
    name: 'cart_id',
    nullable: true,
  })
  cartId: number;
  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
