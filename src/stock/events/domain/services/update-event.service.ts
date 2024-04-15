import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event-store-gateway.interface';
import { Event } from '../entities/event';

@Injectable()
export class UpdateEventService {
    constructor(
        @Inject('EventRepository')
        private readonly eventRepository: EventRepository,
    ) {}
    async execute(id: number, data: Event) {
        const event = await this.eventRepository.get(id);

        if (!event) {
            throw new Error('Event not found');
        }

        Object.assign(event, data);

        await this.eventRepository.update(data);
        return event;
    }
}
