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
import { CreateService } from '../domain/services/create.service';
import { GetByIdService } from '../domain/services/get-by-id.service';
import { ListService } from '../domain/services/list.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryService } from '../domain/services/update-category.service';
import { DeleteCategoryService } from '../domain/services/delete-category.service';

@Controller('stock/categories')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stock-Categories')
export class CategoriesController {
    constructor(
        private readonly listService: ListService,
        private readonly createService: CreateService,
        private readonly getByIdService: GetByIdService,
        private readonly updateService: UpdateCategoryService,
        private readonly deleteService: DeleteCategoryService,
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

    @Patch(':id')
    async update(@Param('id') id, @Body() body) {
        return this.updateService.execute(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return this.deleteService.execute(id);
    }
}
