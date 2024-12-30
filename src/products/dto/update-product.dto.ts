import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { number } from 'joi';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  /// A este DTO agregaremos el ID para servirlo por el payload del micro
  @IsNumber()
  @IsPositive()
  @Type(() => number)
  id: number;
}
