import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post() // no vamos a tener el post por que no va a ser híbrido
  /// Aca definimos la comunicación TCP y comentamos la http rest
  @MessagePattern({ cmd: 'create_product' })
  /// Aca no revimos un Body si no un payload, se valida igual que el body con el DTO, osea que el payload tiene que ser de tipo del DTO
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'find_all_product' }) //- esto { cmd: 'find_all_product' } es como especificar la ruta para comunicarnos, hay muchas forma de definir la forma de nuestro mensaje
  /// Por la parte de el @Param solo se cambia a el payload también
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'find_one_product' }) ///

  //@Param('id', ParseIntPipe) id: number // antes
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  //- aca hay Param y Body
  //@Body() updateProductDto: UpdateProductDto //@Param('id', ParseIntPipe) id: number,
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //@Delete(':id')
  /// Delete
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
