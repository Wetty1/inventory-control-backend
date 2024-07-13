import { Module } from '@nestjs/common';
import { RevenueController } from './infra/revenue.controller';
import { CreateRevenueService } from './domain/services/create-revenue.service';
import { RevenueTypeormRepository } from './infra/database/typeorm/repositories/revenue-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueTypeorm } from './infra/database/typeorm/entities/revenue.entity';
import { ListRevenueService } from './domain/services/list-revenue.service';
import { UpdateRevenueService } from './domain/services/update-revenue.service';
import { DeleteRevenueService } from './domain/services/delete-revenue.service';

@Module({
    imports: [TypeOrmModule.forFeature([RevenueTypeorm])],
    controllers: [RevenueController],
    providers: [
        CreateRevenueService,
        {
            provide: 'RevenueRepository',
            useClass: RevenueTypeormRepository,
        },
        ListRevenueService,
        UpdateRevenueService,
        DeleteRevenueService,
    ],
})
export class RevenueModule {}
