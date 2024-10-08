import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTypeorm } from './infra/typeorm/entities/event.entity';
import { CreateService } from './domain/services/create.service';
import { ExtractByProductService } from './domain/services/extract-by-product.service';
import { GetBalanceByProductService } from './domain/services/get-balance-by-product.service';
import { ListService } from './domain/services/list.service';
import { EventsController } from './infra/controllers/events.controller';
import { EventTypeormRepository } from './infra/typeorm/repositories/event-typeorm.repository';
import { DeleteEventService } from './domain/services/delete-event.service';
import { UpdateEventService } from './domain/services/update-event.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventTypeorm])],
    controllers: [EventsController],
    providers: [
        CreateService,
        ListService,
        {
            provide: 'EventRepository',
            useClass: EventTypeormRepository,
        },
        ExtractByProductService,
        GetBalanceByProductService,
        DeleteEventService,
        UpdateEventService,
    ],
    exports: ['EventRepository'],
})
export class EventsModule {}
