import { Module } from '@nestjs/common';
import { RevenueController } from './infra/revenue.controller';
import { CreateRevenueService } from './domain/services/create-revenue.service';
import { RevenueTypeormRepository } from './infra/database/typeorm/revenue-typeorm.repository';

@Module({
    controllers: [RevenueController],
    providers: [
        CreateRevenueService,
        {
            provide: 'RevenueRepository',
            useClass: RevenueTypeormRepository,
        },
    ],
})
export class RevenueModule {}
