import { Body, Controller, Get, Post } from '@nestjs/common';
<<<<<<< HEAD
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
=======
// import { CreatePurchaseSupply } from 'src/stock/application/create-purchase-supply';
// import { ListPurchases } from 'src/stock/application/list-purcheses';

@Controller('purchases')
export class PurchaseController {
    constructor() {} // private readonly listPurchases: ListPurchases, // private readonly createBuySupply: CreatePurchaseSupply,

    @Post()
    async registerPurchase(@Body() body: any) {
        // const { date, supplyId, quantity, unitValue, supplierId } = body;
        // const output = await this.createBuySupply.execute({
        //     unitValue,
        //     supplyId,
        //     quantity,
        //     date,
        //     supplierId,
        // });
        // return output.id;
        throw new Error('Method not implemented.');
>>>>>>> origin/develop
    }

    @Get('list')
    async list() {
<<<<<<< HEAD
        return this.listPurchases.execute();
=======
        // return this.listPurchases.execute();
        throw new Error('Method not implemented.');
>>>>>>> origin/develop
    }
}
