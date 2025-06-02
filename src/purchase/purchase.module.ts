import { Module } from '@nestjs/common';
import { CreatePurchase } from './application/usecases/create-purchase';
import { CreateSupplier } from './application/usecases/create-supplier';
import { DeleteItemPurchaseService } from './application/usecases/delete-item-purchase/delete-item-purchase.service';

@Module({
    providers: [CreatePurchase, CreateSupplier, DeleteItemPurchaseService],
})
export class PurchaseModule {}
