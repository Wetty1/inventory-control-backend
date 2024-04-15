import { Body, Controller, Post } from '@nestjs/common';
import { CreateRevenueService } from '../domain/services/create-revenue.service';
import { CreateRevenueDTO } from './dtos/create-revenue.dto';
import { Revenue } from '../domain/entities/revenue';
import { ApiTags } from '@nestjs/swagger';

@Controller('revenue')
@ApiTags('revenue')
export class RevenueController {
    constructor(private readonly createRevenueService: CreateRevenueService) {}

    @Post('create')
    async createRevenue(
        @Body() newRevenue: CreateRevenueDTO,
    ): Promise<Revenue> {
        return this.createRevenueService.execute(newRevenue);
    }
}
