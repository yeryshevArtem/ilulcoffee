import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  readonly name?: string;
  readonly brand?: string;
  readonly flavors?: string[];
}
