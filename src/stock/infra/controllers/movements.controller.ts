import { Body, Controller, Post } from '@nestjs/common';
import { ChangeMovementSupply } from 'src/stock/application/change-movement';
import { CreateSupplyOut } from 'src/stock/application/create-supply-out';

@Controller('movements')
export class MovementsController {
    constructor(
        private readonly createSupplyOut: CreateSupplyOut,
        private readonly changeMovement: ChangeMovementSupply,
    ) {}

    @Post()
    async registerMovementOut(@Body() body: any) {
        const { supplyId, quantity, date } = body;
        const output = await this.createSupplyOut.execute({
            supplyId,
            quantity,
            date,
        });
        return output.id;
    }

    @Post('change')
    async changeMovementSupply(@Body() body: any) {
        const { id, type, supplyId, quantity, date } = body;
        const output = await this.changeMovement.execute({
            id,
            type,
            supplyId,
            quantity,
            date,
        });
        return output;
    }
}
