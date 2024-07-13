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
import { CreateRevenueService } from '../domain/services/create-revenue.service';
import { CreateRevenueDTO } from './dtos/create-revenue.dto';
import { Revenue } from '../domain/entities/revenue';
import { ApiTags } from '@nestjs/swagger';
import { ListRevenueService } from '../domain/services/list-revenue.service';
import { UpdateRevenueService } from '../domain/services/update-revenue.service';
import { DeleteRevenueService } from '../domain/services/delete-revenue.service';
import { UpdateRevenueDTO } from './dtos/update-revenue.dto';

@Controller('revenue')
@ApiTags('revenue')
export class RevenueController {
    constructor(
        private readonly createRevenueService: CreateRevenueService,
        private readonly listRevenueService: ListRevenueService,
        private readonly updateRevenueService: UpdateRevenueService,
        private readonly deleteRevenueService: DeleteRevenueService,
    ) {}

    @Post('create')
    async createRevenue(
        @Body() newRevenue: CreateRevenueDTO,
    ): Promise<Revenue> {
        return this.createRevenueService.execute(newRevenue);
    }

    @Get('list')
    async listRevenue(
        @Query() query: { startDate: string; endDate: string },
    ): Promise<Revenue[]> {
        return this.listRevenueService.execute(query.startDate, query.endDate);
    }

    @Patch('update')
    async updateRevenue(@Body() body: UpdateRevenueDTO): Promise<Revenue> {
        return this.updateRevenueService.execute(body);
    }

    @Delete('delete/:id')
    async deleteRevenue(@Param('id') id: string): Promise<void> {
        return this.deleteRevenueService.execute(id);
    }
}
