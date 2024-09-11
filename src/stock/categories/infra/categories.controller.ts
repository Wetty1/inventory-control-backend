import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategory } from '../application/create-category';
import { GetByIdCategory } from '../application/get-by-id';
import { ListCategory } from '../application/list';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategory } from '../application/update-category';
import { DeleteCategory } from '../application/delete-category';

@Controller('stock/categories')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stock-Categories')
export class CategoriesController {
    constructor(
        private readonly listService: ListCategory,
        private readonly createService: CreateCategory,
        private readonly getByIdService: GetByIdCategory,
        private readonly updateService: UpdateCategory,
        private readonly deleteService: DeleteCategory,
    ) {}

    @Get('list')
    async list() {
        return this.listService.execute();
    }

    @Post()
    async create(@Body() body: CreateCategoryDto) {
        return this.createService.execute(body);
    }

    @Get(':id')
    async getById(@Param('id') id) {
        return this.getByIdService.execute(id);
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() body) {
        return this.updateService.execute(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return this.deleteService.execute(id);
    }
}
