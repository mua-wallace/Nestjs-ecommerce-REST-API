import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { ProductEntity } from 'src/product/product.entity';
import { CreateProductDto } from 'src/auth/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async create(
    createProductDto: CreateProductDto,
    user: Users,
  ): Promise<ProductEntity> {
    if (user.role == 'admin') {
      return await this.productRepository.save(createProductDto);
    }
    throw new UnauthorizedException();
  }

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne(id);
  }

  async update(
    id: number,
    product: ProductEntity,
    user: Users,
  ): Promise<UpdateResult> {
    if (user.role == 'admin') {
      return await this.productRepository.update(id, product);
    }
    throw new UnauthorizedException();
  }

  async delete(id: number, user: Users): Promise<DeleteResult> {
    if (user.role == 'admin') {
      return await this.productRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
}
