import { ProductEntity } from 'src/product/product.entity';
import { Users } from '../user.entity';

export class CartDto {
  total: number;
  quantity: number;
  user: Users;
  item: ProductEntity;
}
