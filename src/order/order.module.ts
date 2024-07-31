import { Module } from '@nestjs/common';
import { OrderController } from './infra/controllers/order.controller';
import { OrderGateway } from './infra/gateway/order.gateway';

@Module({
    controllers: [OrderController],
    providers: [OrderGateway],
})
export class OrderModule {}
