import { Module } from '@nestjs/common';
import { RevenueController } from './infra/revenue.controller';
import { CreateRevenueService } from './domain/services/create-revenue.service';
import { RevenueTypeormRepository } from './infra/database/typeorm/repositories/revenue-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueTypeorm } from './infra/database/typeorm/entities/revenue.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RevenueTypeorm])],
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
