import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  // roles: Role[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;

  @OneToOne(() => OrderEntity, (order) => order.user)
  @JoinColumn()
  order: OrderEntity;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}
