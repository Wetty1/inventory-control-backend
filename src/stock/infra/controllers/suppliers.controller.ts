import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSupplier } from 'src/stock/application/create-supplier';
import { ListSuppliers } from 'src/stock/application/list-suppliers';

@Controller('suppliers')
export class SuppliersController {
    constructor(
        private readonly createSupplier: CreateSupplier,
        private readonly listSupplies: ListSuppliers,
    ) {}

    @Get()
    async list() {
        return await this.listSupplies.execute();
    }

    @Post()
    async create(@Body() body: any) {
        const { name } = body;
        const output = await this.createSupplier.execute({ name });
        return output.id;
    }
}
