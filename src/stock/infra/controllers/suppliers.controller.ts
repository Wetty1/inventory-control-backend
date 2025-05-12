import { Body, Controller, Get, Post } from '@nestjs/common';
// import { CreateSupplier } from 'src/stock/application/create-supplier';
// import { ListSuppliers } from 'src/stock/application/list-suppliers';

@Controller('suppliers')
export class SuppliersController {
    constructor() {} // private readonly listSupplies: ListSuppliers, // private readonly createSupplier: CreateSupplier,

    @Get()
    async list() {
        // return await this.listSupplies.execute();
        throw new Error('Method not implemented.');
    }

    @Post()
    async create(@Body() body: any) {
        throw new Error('Method not implemented.');
        // const { name } = body;
        // const output = await this.createSupplier.execute({ name });
        // return output.id;
    }
}
