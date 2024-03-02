import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ListService } from '../services/list.service';
import { CreateService } from '../services/create.service';
import { GetByIdService } from '../services/get-by-id.service';
import { CreateCategoryDto, ListCategoryDto } from '../dto/category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

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
    async list(@Query() query: ListCategoryDto) {
        console.log(query);
        return this.listService.execute(query);
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
