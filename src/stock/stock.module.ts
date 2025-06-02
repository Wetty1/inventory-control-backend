import { Module } from '@nestjs/common';
import { StockController } from './infra/controllers/stock.controller';
import { CreateStockEvent } from './application/usecases/create-stock-event';

@Module({
    imports: [],
    controllers: [StockController],
    exports: [],
    providers: [CreateStockEvent],
})
export class StockModule {}
