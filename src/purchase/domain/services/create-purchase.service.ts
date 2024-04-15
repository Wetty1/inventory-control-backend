import { Inject, Injectable } from '@nestjs/common';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { Purchase } from '../entities/purchase';
import { EventRepository } from 'src/stock/events/domain/repositories/event-store-gateway.interface';

@Injectable()
export class CreatePurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('EventRepository')
        private readonly eventRepository: EventRepository,
    ) {}
    async execute(newPurchase: Purchase) {
        const purchase = await this.purchaseRepository.create(newPurchase);
        const event = await this.eventRepository.create({
            date: purchase.date,
            productId: purchase.productId,
            quantity: purchase.quantity,
            type: 'entrada',
            purchaseId: purchase.id,
        });

        const updatedPurchase = await this.purchaseRepository.update({
            ...purchase,
            eventId: event.id,
        });

        return updatedPurchase;
    }
}
