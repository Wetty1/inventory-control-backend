import { Body, Controller, Post } from '@nestjs/common';
import { CreateRevenueService } from '../domain/services/create-revenue.service';
import { Revenue } from '../domain/entities/revenue';

@Controller('revenue')
export class RevenueController {
    constructor(private readonly createRevenueService: CreateRevenueService) {}

    @Post()
    async createRevenue(@Body() newRevenue: Revenue) {
        return this.createRevenueService.execute(newRevenue);
    }
}
