import { Body, Post } from '@nestjs/common';
import { CreateSupplyOut } from 'src/stock1/application/create-supply-out';

export class MovimentsController {
    constructor(private readonly createSupplyOut: CreateSupplyOut) {}

    @Post()
    async registerMovimentOut(@Body() body: any) {
        const { supplyId, quantity, date } = body;
        const output = await this.createSupplyOut.execute({
            supplyId,
            quantity,
            date,
        });
        return output.id;
    }
}
