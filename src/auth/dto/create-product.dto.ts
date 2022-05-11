import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;

  order: OrderEntity;
  carts: CartEntity[];
}
