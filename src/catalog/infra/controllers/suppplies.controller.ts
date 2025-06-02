import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProduct } from '../../application/usecases/create-product';

@Controller('products')
export class SuppliesController {
    constructor(private readonly createProduct: CreateProduct) {}

    @Get()
    async list() {
        // return await this.listProducts.execute();
        throw new Error('Method not implemented.');
    }

    @Post()
    async create(@Body() body: any) {
        const { name, categoryId } = body;
        const output = await this.createProduct.execute({ name, categoryId });
        return output.id;
    }
}
