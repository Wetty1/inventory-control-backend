import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/catalog/domain/repository/product.repository';
import { StockEventRepository } from 'src/stock/domain/repository/event.repository';

interface Input {
    id: number;
    productId: string;
    quantity: number;
    date: Date;
    type: 'out' | 'in';
}

@Injectable()
export class ChangeStockEventUseCase {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
        @Inject('StockEventRepository')
        private readonly stockEventRepository: StockEventRepository,
    ) {}

    async execute(input: Input) {
        const stockEvent = await this.stockEventRepository.get(input.id);
        if (!stockEvent) {
            throw new Error('Event not found');
        }
        if (stockEvent.getType() !== 'out') {
            throw new Error('Event is not an output');
        }

        stockEvent.setQuantity(input.quantity);

        const product = await this.productRepository.get(input.productId);
        if (!product) {
            throw new Error('Supply not found');
        }
        stockEvent.setType(input.type);
        stockEvent.setDate(input.date);
        stockEvent.setProductId(product.getId());

        return stockEvent;
    }
}
