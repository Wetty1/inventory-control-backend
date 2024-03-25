import { Inject, Injectable } from '@nestjs/common';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { Purchase } from '../entities/purchase';

@Injectable()
export class CreatePurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
    ) {}
    async execute(newPurchase: Purchase) {
        return this.purchaseRepository.create(newPurchase);
    }
}
