import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/events/entities/event.entity/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, FlavorEntity, EventEntity])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
