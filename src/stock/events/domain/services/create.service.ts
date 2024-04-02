import { Inject, Injectable } from '@nestjs/common';
import { Event } from '../entities/event';
import { EventRepository } from '../repositories/event-store-gateway.interface';

@Injectable()
export class CreateService {
    constructor(
        @Inject('EventRepository')
        private readonly eventStore: EventRepository,
    ) {}

    async execute(event: Event): Promise<Event> {
        await this.eventStore.create(event);
        return event;
    }
}
