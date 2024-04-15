import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event-store-gateway.interface';

@Injectable()
export class DeleteEventService {
    constructor(
        @Inject('EventRepository')
        private readonly eventStore: EventRepository,
    ) {}
    async execute(id) {
        return this.eventStore.delete(id);
    }
}
