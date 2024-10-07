import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSupply } from 'src/stock/application/create-supply';
import { ListSupplies } from 'src/stock/application/list-supplies';

@Controller('supplies')
export class SuppliesController {
    constructor(
        private readonly createSupply: CreateSupply,
        private readonly listSupplies: ListSupplies,
    ) {}

    @Get()
    async list() {
        return await this.listSupplies.execute();
    }

    @Post()
    async create(@Body() body: any) {
        const { name, categoryId } = body;
        const output = await this.createSupply.execute({ name, categoryId });
        return output.id;
    }
}
