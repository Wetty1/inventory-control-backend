import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event-store-gateway.interface';

@Injectable()
export class ExtractByProductService {
    constructor(
        @Inject('EventRepository')
        private readonly eventStoreGateway: EventRepository,
    ) {}

    async execute(productId: number) {
        return this.eventStoreGateway.listByProduct(productId);
    }
}
