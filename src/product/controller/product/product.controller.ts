import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/auth/dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ProductEntity } from 'src/product/product.entity';
import { ProductsService } from 'src/product/service/product/product.service';

import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @Get()
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  //   @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit = 3,
  // ): Promise<Pagination<ProductEntity>> {
  //   limit = limit > 5 ? 5 : limit;
  //   return this.ProductsService.paginate({
  //     page,
  //     limit,
  //     route: 'http://localhost:3000/api/v1/products',
  //   });
  // }

  @Get('ook')
  async getLimit(@Req() req: any) {
    const builder = await this.productsService.queryBuilder('product');
    if (req.query.s) {
      builder.where('product.name LIKE :s', { s: `%${req.query.s}%` });
    }
    const sort: any = req.query.sort;
    if (sort) {
      builder.orderBy('product.price', sort.toUpperCase());
    }
    const page: number = parseInt(req.query.page as any) || 1;
    const perPage = 2;
    const total = await builder.getCount();
    builder.offset((page - 1) * page).limit(perPage);
    return {
      data: await builder.getMany(),
      total,
      page,
      lastPage: Math.ceil(total / perPage),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  @Get()
  async GetAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  // @hasRoles('Admin')
  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  @Post()
  async Create(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  @Get(':id')
  async GetOne(@Param() id: number): Promise<ProductEntity> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: ProductEntity,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
