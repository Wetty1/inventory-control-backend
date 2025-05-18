import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockEventRepository } from '../../../domain/repository/event.repository';
import { StockEventTypeorm } from '../entities/event.entity';
import { StockEvent } from 'src/stock/domain/entity/event';

@Injectable()
export class StockEventTypeormRepository implements StockEventRepository {
    constructor(
        @InjectRepository(StockEventTypeorm)
        private readonly stockEventTypeormRepository: Repository<StockEventTypeorm>,
    ) {}

    async get(id: number): Promise<StockEvent> {
        const stockEventTypeorm =
            await this.stockEventTypeormRepository.findOne({
                where: { id },
            });
        return StockEventTypeorm.to(stockEventTypeorm);
    }

    async save(stockEvent: StockEvent): Promise<StockEvent> {
        const stockEventTypeorm = StockEventTypeorm.from(stockEvent);
        const stockEventSaved =
            await this.stockEventTypeormRepository.save(stockEventTypeorm);
        return StockEventTypeorm.to(stockEventSaved);
    }
    async delete(id: any): Promise<void> {
        await this.stockEventTypeormRepository.delete(id);
        return Promise.resolve();
    }
}
