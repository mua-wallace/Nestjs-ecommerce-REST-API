import { Users } from 'src/auth/user.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Users, (user) => user.carts)
  user: Users;

  @ManyToOne(() => ProductEntity, (item) => item.carts)
  item: ProductEntity;
}
