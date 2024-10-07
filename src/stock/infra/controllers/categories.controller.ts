import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateCategory } from 'src/stock/application/create-category';
import { ListCategories } from 'src/stock/application/list-categories';

@Controller('categories')
export class CategoriesController {
    private readonly logger = new Logger(CategoriesController.name);
    constructor(
        private readonly listCategories: ListCategories,
        private readonly createCategories: CreateCategory,
    ) {}

    @Get()
    async list() {
        try {
            const categories = await this.listCategories.execute();
            return categories;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    @Post()
    async create(@Body() input: any) {
        try {
            const category = await this.createCategories.execute(input);
            return category;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
