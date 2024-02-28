import { Inject, Injectable } from '@nestjs/common';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';
import { Event } from '../entities/event';

@Injectable()
export class ListService {
    constructor(
        @Inject('EventStoreGatewayInterface')
        private readonly eventStore: EventStoreGatewayInterface,
    ) {}

    async execute(): Promise<Event[]> {
        const listEvent = await this.eventStore.list();
        return listEvent;
    }
}
