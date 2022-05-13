import { randomInt } from 'crypto';
import { Factory } from 'nestjs-seeder';
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

  @Factory((faker) => faker.lorem.wors(2))
  @Column()
  name: string;

  @Factory((faker) => randomInt(100, 10000))
  @Column()
  price: number;

  @Factory((faker) => randomInt(1, 10))
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
