import { Users } from 'src/auth/user.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;

  @OneToOne(() => Users, (user) => user.order)
  user: Users;

  @OneToMany(() => ProductEntity, (item) => item.carts)
  items: ProductEntity[];
}
