import { Coffee } from 'src/coffees/entities/coffee.entity';
import { FlavorEntity } from 'src/coffees/entities/flavor.entity/flavor.entity';
import { CoffeeRefactor1671727479154 } from 'src/migrations/1671727479154-CoffeeRefactor';
import { SchemaSync1671728364356 } from 'src/migrations/1671728364356-SchemaSync';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, FlavorEntity],
  migrations: [CoffeeRefactor1671727479154, SchemaSync1671728364356],
});
