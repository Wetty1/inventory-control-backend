import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { CreateService } from './services/create.service';
import { ListService } from './services/list.service';
import { EventStorePrisma } from './gateways/implementations/event-store-prisma';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTORM } from './gateways/interfaces/event.entity';
import { ExtractByProductService } from './services/extract-by-product.service';
import { GetBalanceByProductService } from './services/get-balance-by-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventTORM])],
  controllers: [EventsController],
  providers: [
    CreateService,
    ListService,
    {
      provide: 'EventStoreGatewayInterface',
      useClass: EventStorePrisma,
    },
    ExtractByProductService,
    GetBalanceByProductService,
  ],
})
export class EventsModule {}
