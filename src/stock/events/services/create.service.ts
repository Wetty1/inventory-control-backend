import { Inject, Injectable } from '@nestjs/common';
import { Event } from '../entities/event';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';

@Injectable()
export class CreateService {
    constructor(
        @Inject('EventStoreGatewayInterface')
        private readonly eventStore: EventStoreGatewayInterface,
    ) {}

    async execute(event: Event): Promise<Event> {
        await this.eventStore.create(event);
        return event;
    }
}
