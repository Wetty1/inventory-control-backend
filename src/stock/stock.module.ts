import { Module } from '@nestjs/common';
import { ChangeMovementSupply } from './application/change-movement';
import { ChangePurchaseSupply } from './application/change-purchase-supply';
import { CreatePurchaseSupply } from './application/create-purchase-supply';
import { CreateSupplyOut } from './application/create-supply-out';
import { CreateSupplier } from './application/create-supplier';
import { ListPurchases } from './application/list-purcheses';
import { ListSuppliers } from './application/list-suppliers';
import { MovementsController } from './infra/controllers/movements.controller';
import { SuppliersController } from './infra/controllers/suppliers.controller';
import { SuppliesController } from './infra/controllers/suppplies.controller';
import { CategoriesController } from './infra/controllers/categories.controller';
import { PurchaseController } from './infra/controllers/purchase.controller';

@Module({
    imports: [],
    controllers: [
        MovementsController,
        SuppliersController,
        SuppliesController,
        CategoriesController,
        PurchaseController,
    ],
    providers: [
        ChangeMovementSupply,
        ChangePurchaseSupply,
        CreatePurchaseSupply,
        CreateSupplier,
        CreateSupplyOut,
        ListPurchases,
        ListSuppliers,
    ],
    exports: [],
})
export class StockModule {}
