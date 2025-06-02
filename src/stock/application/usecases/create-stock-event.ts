import { Inject, Injectable } from '@nestjs/common';
import { StockEvent } from 'src/stock/domain/entity/event';
import { StockEventRepository } from 'src/stock/domain/repository/event.repository';

@Injectable()
export class CreateStockEvent {
    constructor(
        @Inject('StockEventRepository')
        private readonly stockEventRepository: StockEventRepository,
    ) {}
    async execute(input: Input) {
        const stockEvent = StockEvent.create(
            input.date,
            input.productId,
            input.quantity,
            input.type,
        );
        return this.stockEventRepository.save(stockEvent);
    }
}

type Input = {
    date: Date;
    productId: number;
    purchaseId: number;
    quantity: number;
    type: string;
};
