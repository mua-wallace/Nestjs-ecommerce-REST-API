import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { CartEntity } from 'src/cart/cart.entity';
import { ProductEntity } from './product.entity';
import { ProductSeeder } from './product.seed';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'wallice',
      password: 'mbiketurah2020',
      database: 'ecommerceNestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductEntity, CartEntity]),
  ],
}).run([ProductSeeder]);
