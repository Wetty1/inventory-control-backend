import { Module } from '@nestjs/common';
import { MovementsController } from './infra/controllers/movements.controller';
import { SuppliersController } from './infra/controllers/suppliers.controller';
import { PurchaseController } from './infra/controllers/purchase.controller';

@Module({
    imports: [],
    controllers: [MovementsController, SuppliersController, PurchaseController],
    exports: [],
})
export class StockModule {}
