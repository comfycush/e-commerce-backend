import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
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

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
