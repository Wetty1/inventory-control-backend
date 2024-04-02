import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateService } from '../domain/services/create.service';
import { GetByIdService } from '../domain/services/get-by-id.service';
import { ListService } from '../domain/services/list.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('stock/categories')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stock-Categories')
export class CategoriesController {
    constructor(
        private readonly listService: ListService,
        private readonly createService: CreateService,
        private readonly getByIdService: GetByIdService,
    ) {}

    @Get('list')
    async list() {
        return this.listService.execute();
    }

    @Post('create')
    async create(@Body() body: CreateCategoryDto) {
        return this.createService.execute(body);
    }

    @Get(':id')
    async getById(@Param('id') id) {
        return this.getByIdService.execute(id);
    }
}
