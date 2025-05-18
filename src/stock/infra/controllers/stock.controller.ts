import { Body, Controller, Post } from '@nestjs/common';
// import { ChangeMovementSupply } from 'src/stock/application/change-movement';
// import { CreateSupplyOut } from 'src/stock/application/create-supply-out';

@Controller('stock')
export class StockController {
    constructor() {} // private readonly changeMovement: ChangeMovementSupply, // private readonly createSupplyOut: CreateSupplyOut,

    @Post()
    async registerMovementOut(@Body() body: any) {
        // const { supplyId, quantity, date } = body;
        // const output = await this.createSupplyOut.execute({
        //     supplyId,
        //     quantity,
        //     date,
        // });
        // return output.id;
        throw new Error('Method not implemented.');
    }

    @Post('change')
    async changeMovementSupply(@Body() body: any) {
        // const { id, type, supplyId, quantity, date } = body;
        // const output = await this.changeMovement.execute({
        //     id,
        //     type,
        //     supplyId,
        //     quantity,
        //     date,
        // });
        // return output;
        throw new Error('Method not implemented.');
    }
}
