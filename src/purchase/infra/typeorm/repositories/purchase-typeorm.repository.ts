import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/purchase/domain/entities/purchase';
import { PurchaseRepository } from 'src/purchase/domain/repositories/purchase.repository';
import { Repository } from 'typeorm';
import { PurchaseTypeorm } from '../entities/purchase.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchaseTypeormRepository implements PurchaseRepository {
    constructor(
        @InjectRepository(PurchaseTypeorm)
        private readonly purchaseRepository: Repository<PurchaseTypeorm>,
    ) {}
    async create(newPurchase: Purchase): Promise<Purchase> {
        return this.purchaseRepository.save(newPurchase);
    }
}
