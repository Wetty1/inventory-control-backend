import { Module } from '@nestjs/common';
import { CreatePurchase } from './application/usecases/create-purchase';
import { CreateSupplier } from './application/usecases/create-supplier';

@Module({
    providers: [CreatePurchase, CreateSupplier],
})
export class PurchaseModule {}
