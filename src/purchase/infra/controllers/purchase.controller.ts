import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('purchases')
export class PurchaseController {
    constructor() {}

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
    }

    @Get('list')
    async list() {
        // return this.listPurchases.execute();
        throw new Error('Method not implemented.');
    }
}
