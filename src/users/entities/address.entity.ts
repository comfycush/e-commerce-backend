import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'address_line1',
  })
  addressLine1: string;

  @Column({
    name: 'address_line2',
  })
  addressLine2: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column({
    name: 'postal_code',
  })
  postalCode: string;

  @Column()
  country: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses: UserAddress[];
}
