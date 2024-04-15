import { Module } from '@nestjs/common';
import { PurchaseController } from './infra/purchase.controller';
import { CreatePurchaseService } from './domain/services/create-purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseTypeorm } from './infra/typeorm/entities/purchase.entity';
import { PurchaseTypeormRepository } from './infra/typeorm/repositories/purchase-typeorm.repository';
import { EventsModule } from 'src/stock/events/events.module';

@Module({
    imports: [TypeOrmModule.forFeature([PurchaseTypeorm]), EventsModule],
    controllers: [PurchaseController],
    providers: [
        CreatePurchaseService,
        {
            provide: 'PurchaseRepository',
            useClass: PurchaseTypeormRepository,
        },
    ],
})
export class PurchaseModule {}
