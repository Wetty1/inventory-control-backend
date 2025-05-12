import { Module } from '@nestjs/common';
<<<<<<< HEAD
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
=======
import { MovementsController } from './infra/controllers/movements.controller';
import { SuppliersController } from './infra/controllers/suppliers.controller';
>>>>>>> origin/develop
import { PurchaseController } from './infra/controllers/purchase.controller';

@Module({
    imports: [],
<<<<<<< HEAD
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
=======
    controllers: [MovementsController, SuppliersController, PurchaseController],
>>>>>>> origin/develop
    exports: [],
})
export class StockModule {}
