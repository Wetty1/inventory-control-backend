import { Module } from '@nestjs/common';
import { RevenueController } from './infra/revenue.controller';
import { RevenueTypeormRepository } from './infra/database/typeorm/repositories/revenue-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueTypeorm } from './infra/database/typeorm/entities/revenue.entity';
import { CreateRevenueService } from './application/use-cases/create-revenue.service';
import { DeleteRevenueService } from './application/use-cases/delete-revenue.service';
import { ListRevenueService } from './application/use-cases/list-revenue.service';
import { UpdateRevenueService } from './application/use-cases/update-revenue.service';

@Module({
    imports: [TypeOrmModule.forFeature([RevenueTypeorm])],
    controllers: [RevenueController],
    providers: [
        {
            provide: 'RevenueRepository',
            useClass: RevenueTypeormRepository,
        },
        CreateRevenueService,
        ListRevenueService,
        UpdateRevenueService,
        DeleteRevenueService,
    ],
})
export class RevenueModule {}
