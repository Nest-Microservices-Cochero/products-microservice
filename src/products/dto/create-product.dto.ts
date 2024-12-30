import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

/// Lo que recibimos de al crear un producto
export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @Min(0)
  @Type(() => Number)
  public price: number;
}
