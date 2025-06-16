import { Module } from '@nestjs/common';
import { CreatePurchase } from './application/usecases/create-purchase';
import { CreateSupplier } from './application/usecases/create-supplier';
import { DeleteItemPurchaseService } from './application/usecases/delete-item-purchase/delete-item-purchase.service';
import { GetItemPurchaseService } from './application/usecases/get-item-purchase/get-item-purchase.service';
import { GetSupplierService } from './application/usecases/get-supplier/get-supplier.service';
import { DeleteSupplierService } from './application/usecases/delete-supplier/delete-supplier.service';
import { GetPurchaseService } from './application/usecases/get-purchase/get-purchase.service';
import { GetPurchaseService } from './application/usecases/get-purchase/get-purchase.service';
import { DeletePurchaseService } from './application/usecases/delete-purchase/delete-purchase.service';
import { GetItemPurchaseService } from './application/usecases/get-item-purchase/get-item-purchase.service';

@Module({
    providers: [CreatePurchase, CreateSupplier, DeleteItemPurchaseService, GetItemPurchaseService, DeletePurchaseService, GetPurchaseService, DeleteSupplierService, GetSupplierService],
})
export class PurchaseModule {}
