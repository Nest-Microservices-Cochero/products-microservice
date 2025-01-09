import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()

// Extendemos la clase
export class ProductsService extends PrismaClient implements OnModuleInit {
  // Agregar mensaje al logger de nest
  private readonly logger = new Logger('ProductsService');

  // Creamos un método ne inicio
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  // Creamos un producto en la DB
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    /// paginar entre los productos no eliminados
    const totalPages = await this.product.count({
      where: { available: true },
    });

    const lastPage = Math.ceil(totalPages / limit);

    return {
      meta: {
        page: page || 1,
        lastPage,
        totalCount: totalPages,
      },
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        ///
        where: { available: true },
      }),
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id: id, available: true },
    });

    if (!product)
      /// Enviamos un objeto con estas dos propiedades
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'No found product with id ' + id,
      });

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    /// Para no enviar el id en la data
    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // return this.product.delete({ where: { id } });

    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });

    return product;
  }

  /// recibir los ids de producto validar su existencia y retorna la info de estos productos
  async validateProducts(ids: number[]) {
    ids = Array.from(new Set(ids));

    const products = await this.product.findMany({
      where: { id: { in: ids }, available: true },
    });

    if (products.length !== ids.length) {
      throw new RpcException({
        message: 'One or more products not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return products;
  }
}
