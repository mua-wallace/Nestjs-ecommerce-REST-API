import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;

  @OneToMany(() => CartEntity, (cart) => cart.item)
  carts: CartEntity[];
  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
