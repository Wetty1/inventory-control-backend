import { Module } from '@nestjs/common';
import { RevenueController } from './infra/controllers/revenue.controller';
import { RevenueTypeormRepository } from './infra/database/typeorm/repositories/revenue-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueTypeorm } from './infra/database/typeorm/entities/revenue.entity';
import { CreateRevenue } from './application/usecases/create-revenue';
import { DeleteRevenue } from './application/usecases/delete-revenue';
import { ListRevenueByTime } from './application/query/list-revenue-by-time';

@Module({
    imports: [TypeOrmModule.forFeature([RevenueTypeorm])],
    controllers: [RevenueController],
    providers: [
        {
            provide: 'RevenueRepository',
            useClass: RevenueTypeormRepository,
        },
        CreateRevenue,
        ListRevenueByTime,
        DeleteRevenue,
    ],
})
export class RevenueModule {}
