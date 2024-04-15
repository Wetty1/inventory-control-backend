import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from 'src/stock/events/domain/repositories/event-store-gateway.interface';
import { Repository } from 'typeorm';
import { EventTypeorm } from '../entities/event.entity';
import { Event } from '../../../domain/entities/event';

export class EventTypeormRepository implements EventRepository {
    constructor(
        @InjectRepository(EventTypeorm)
        private readonly eventRepository: Repository<EventTypeorm>,
    ) {}
    async get(id: number): Promise<Event> {
        return this.eventRepository.findOne({ where: { id } });
    }
    async update(event: Event): Promise<Event> {
        return this.eventRepository.save(event);
    }
    async create(event: EventTypeorm): Promise<EventTypeorm> {
        const newEvent: EventTypeorm = {
            ...event,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const eventCreated = await this.eventRepository.create(newEvent);

        return this.eventRepository.save(eventCreated);
    }

    async listByProduct(productId: number): Promise<Event[]> {
        try {
            return this.eventRepository.find({
                where: { productId },
                order: { date: 'ASC' },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
    async balanceByProduct(productId: number): Promise<number> {
        try {
            const entries = await this.eventRepository
                .createQueryBuilder('event')
                .where('event.productId = :productId', { productId })
                .where('event.type = :type', { type: 'entrada' })
                .select('SUM(event.quantity)', 'balance')
                .getRawOne();

            const outs = await this.eventRepository
                .createQueryBuilder('event')
                .where('event.productId = :productId', { productId })
                .where('event.type = :type', { type: 'saida' })
                .select('SUM(event.quantity)', 'balance')
                .getRawOne();

            return entries.balance - outs.balance;
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id: number): Promise<void> {
        await this.eventRepository.delete(id);
    }
    async list(): Promise<Event[]> {
        return this.eventRepository.find({
            order: { date: 'DESC' },
        });
    }
}
