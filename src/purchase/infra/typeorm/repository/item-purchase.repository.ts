import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemPurchaseRepository } from 'src/purchase/domain/repository/item-purchase.repository';
import { ItemPurchase } from 'src/purchase/domain/entity/item-purchase';
import { ItemPurchaseTypeorm } from '../entities/item-purchase.entity';

@Injectable()
export class ItemPurchaseTypeormRepository implements ItemPurchaseRepository {
    constructor(
        @InjectRepository(ItemPurchaseTypeorm)
        private readonly repository: Repository<ItemPurchaseTypeorm>,
    ) {}

    async getAllByPurchaseId(purchaseId: number): Promise<ItemPurchase[]> {
        const items = await this.repository.find({
            where: { purchaseId },
        });
        return items.map((item) => ItemPurchaseTypeorm.to(item));
    }
    async save(item: ItemPurchase): Promise<ItemPurchase> {
        const itemPurchaseTypeorm = ItemPurchaseTypeorm.from(item);
        const itemSaved = await this.repository.save(itemPurchaseTypeorm);
        return ItemPurchaseTypeorm.to(itemSaved);
    }
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
        return Promise.resolve();
    }
    async get(id: number): Promise<ItemPurchase> {
        const item = await this.repository.findOne({
            where: { id },
        });
        if (!item) return null;
        return ItemPurchaseTypeorm.to(item);
    }
}
