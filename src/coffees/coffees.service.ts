import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose/dist';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
// import { Event } from 'src/events/entities/event.entity/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}
  // @InjectConnection() private readonly connection: Connection,
  // @InjectModel(Event.name) private readonly eventModel: Model<Event>,

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const coffees = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffees) {
      throw new NotFoundException(`Coffee #${id} not founds`);
    }
    return coffees;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }

  // async recommendCoffee(coffee: Coffee) {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   try {
  //     coffee.recommendations++;
  //     const recommendEvent = new this.eventModel({
  //       name: 'recommend_coffee',
  //       type: 'coffee',
  //       payload: { coffeeId: coffee.id },
  //     });
  //     await recommendEvent.save({ session });
  //     await coffee.save({ session });

  //     await session.commitTransaction();
  //   } catch (err) {
  //     await session.abortTransaction();
  //   } finally {
  //     session.endSession();
  //   }
  // }
}
