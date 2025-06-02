import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateRevenueDTO } from '../dtos/create-revenue.dto';
import { Revenue } from '../../domain/entity/revenue';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRevenueDTO } from '../dtos/update-revenue.dto';
import { CreateRevenue } from '../../application/usecases/create-revenue';
import { DeleteRevenue } from '../../application/usecases/delete-revenue';
import { ListRevenueByTime } from 'src/revenue/application/query/list-revenue-by-time';

@Controller('revenue')
@ApiTags('revenue')
export class RevenueController {
    constructor(
        private readonly createRevenue: CreateRevenue,
        private readonly listRevenueByTime: ListRevenueByTime,
        private readonly deleteRevenue: DeleteRevenue,
    ) {}

    @Post('create')
    async create(@Body() newRevenue: CreateRevenueDTO): Promise<Revenue> {
        return this.createRevenue.execute(newRevenue);
    }

    @Get('list')
    async list(
        @Query() query: { startDate: string; endDate: string },
    ): Promise<Revenue[]> {
        return this.listRevenueByTime.execute(
            new Date(query.startDate),
            new Date(query.endDate),
        );
    }

    @Patch('update')
    async update(@Body() body: UpdateRevenueDTO): Promise<Revenue> {
        console.log(body);
        throw new Error('Method not implemented');
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.deleteRevenue.execute(id);
    }
}
