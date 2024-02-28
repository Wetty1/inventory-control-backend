import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../entities/event';
import { EventStoreGatewayInterface } from '../interfaces/event-store-gateway.interface';
import { Repository } from 'typeorm';
import { EventTORM } from '../interfaces/event.entity';

export class EventStorePrisma implements EventStoreGatewayInterface {
    constructor(
        @InjectRepository(EventTORM)
        private readonly eventRepository: Repository<EventTORM>,
    ) {}
    async create(event: EventTORM): Promise<EventTORM> {
        const newEvent: EventTORM = {
            ...event,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const eventCreated = await this.eventRepository.create(newEvent);

        return this.eventRepository.save(eventCreated);
    }
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    list(): Promise<Event[]> {
        throw new Error('Method not implemented.');
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
}
