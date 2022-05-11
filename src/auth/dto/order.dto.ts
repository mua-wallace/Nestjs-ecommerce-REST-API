import { ProductEntity } from 'src/product/product.entity';
import { Users } from '../user.entity';

export class OrderDto {
  subTotal: number;
  pending: boolean;
  user: Users;
  item: ProductEntity;
}
