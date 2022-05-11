import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
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

  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  @Get()
  async GetAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

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
