import { Inject, Injectable } from '@nestjs/common';
import { Event } from '../entities/event';
import { EventRepository } from '../repositories/event-store-gateway.interface';

@Injectable()
export class ListService {
    constructor(
        @Inject('EventRepository')
        private readonly eventStore: EventRepository,
    ) {}

    async execute(): Promise<Event[]> {
        const listEvent = await this.eventStore.list();
        return listEvent;
    }
}
