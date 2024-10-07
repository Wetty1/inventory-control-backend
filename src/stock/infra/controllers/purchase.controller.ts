import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePurchaseSupply } from 'src/stock/application/create-purchase-supply';
import { ListPurchases } from 'src/stock/application/list-purcheses';

@Controller('purchases')
export class PurchaseController {
    constructor(
        private readonly createBuySupply: CreatePurchaseSupply,
        private readonly listPurchases: ListPurchases,
    ) {}

    @Post()
    async registerPurchase(@Body() body: any) {
        const { date, supplyId, quantity, unitValue, supplierId } = body;
        const output = await this.createBuySupply.execute({
            unitValue,
            supplyId,
            quantity,
            date,
            supplierId,
        });
        return output.id;
    }

    @Get('list')
    async list() {
        return this.listPurchases.execute();
    }
}
