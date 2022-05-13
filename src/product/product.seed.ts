import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
export class ProductSeeder implements Seeder {

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  seed(): Promise<any> {
    const products = DataFactory.createForClass(ProductEntity).generate(50);
    return this.productRepository.insert(products);
  }
  drop(): Promise<any> {
    return this.productRepository.delete({});
  }
}
