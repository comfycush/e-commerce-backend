import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { User } from './user.entity';

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'is_default',
  })
  isDefault: boolean;

  @Column({
    name: 'user_id',
  })
  userId: number;
  @ManyToOne(() => User, (user) => user.userAddresses)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    name: 'address_id',
  })
  addressId: number;
  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn({
    name: 'address_id',
  })
  address: Address;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
