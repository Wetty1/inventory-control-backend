import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-produt.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateService } from '../../domain/services/create.service';
import { UpdateService } from '../../domain/services/update.service';
import { ListProductService } from '../../domain/services/list-product.service';
import { ListProductByCategoryService } from '../../domain/services/list-product-by-category.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { DeleteProductService } from '../../domain/services/delete.service';
import { ListExtractProductService } from '../../domain/services/list-extract-product.service';

@Controller('stock/products')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stock-Products')
export class ProductsController {
    constructor(
        private readonly createProductsService: CreateService,
        private readonly updateProductsService: UpdateService,
        private readonly listAllProductsService: ListProductService,
        private readonly listProductsByCategoryService: ListProductByCategoryService,
        private readonly deleteProductsService: DeleteProductService,
        private readonly listExtractProductsService: ListExtractProductService,
    ) {}

    @Get('list')
    async list() {
        try {
            return this.listAllProductsService.execute();
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    @Get('list-extract')
    async listExtract() {
        try {
            return this.listExtractProductsService.execute();
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    @Get('list-by-category/:id')
    async listByCategory(@Param('id') categoryId: string) {
        try {
            return this.listProductsByCategoryService.execute(categoryId);
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    @Post('create')
    async create(@Body() body: CreateProductDto) {
        try {
            return this.createProductsService.execute(body);
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
        try {
            return this.updateProductsService.execute(id, body);
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return this.deleteProductsService.execute(id);
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }
}
