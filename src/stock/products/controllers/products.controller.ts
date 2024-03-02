import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateService } from '../services/create.service';
import { UpdateService } from '../services/update.service';
import { CreateProductDto } from '../dto/create-produt.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('stock/products')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stock-Products')
export class ProductsController {
    constructor(
        private readonly createProductsService: CreateService,
        private readonly updateProductsService: UpdateService,
    ) {}

    @Get()
    async list() {}

    @Post('create')
    async create(@Body() body: CreateProductDto) {
        try {
            return this.createProductsService.execute(body);
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }
}
