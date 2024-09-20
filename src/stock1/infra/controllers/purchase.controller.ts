import { Body, Controller, Post } from '@nestjs/common';
import { CreateBuySupply } from 'src/stock1/application/create-buy-supply';

@Controller()
export class PurchaseController {
    constructor(private readonly createBuySupply: CreateBuySupply) {}

    @Post()
    async registerPurchase(@Body() body: any) {
        const { date, supplyId, quantity, unitValue } = body;
        const output = await this.createBuySupply.execute({
            unitValue,
            supplyId,
            quantity,
            date,
        });
        return output.id;
    }
}
