import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/purchase/domain/entity/purchase';
import { PurchaseRepository } from 'src/purchase/domain/repository/purchase.repository';
import { Repository } from 'typeorm';
import { PurchaseTypeorm } from '../entities/purchase.entity';

@Injectable()
export class PurchaseTypeormRepository implements PurchaseRepository {
    constructor(
        @InjectRepository(PurchaseTypeorm)
        private readonly repository: Repository<PurchaseTypeorm>,
    ) {}

    async save(newPurchase: Purchase): Promise<Purchase> {
        const purchaseTypeorm = PurchaseTypeorm.from(newPurchase);
        const purchaseSaved = await this.repository.save(purchaseTypeorm);
        return PurchaseTypeorm.to(purchaseSaved);
    }
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
        return Promise.resolve();
    }
    async get(id: number): Promise<Purchase> {
        const purchaseTypeorm = await this.repository.findOne({
            where: { id },
        });
        return PurchaseTypeorm.to(purchaseTypeorm);
    }
}
