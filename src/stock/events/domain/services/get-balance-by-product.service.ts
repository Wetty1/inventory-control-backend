import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event-store-gateway.interface';

@Injectable()
export class GetBalanceByProductService {
    constructor(
        @Inject('EventRepository')
        private readonly eventStore: EventRepository,
    ) {}

    async execute(productId: number): Promise<number> {
        const balance = await this.eventStore.balanceByProduct(productId);
        return balance;
    }
}
