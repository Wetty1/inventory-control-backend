import { Module } from '@nestjs/common';
import { OrderController } from './infra/controllers/order.controller';
import { OrderGateway } from './infra/gateway/order.gateway';
import { CreateOrderUseCase } from './application/create-order';
import { OrderTypeormRepository } from './infra/database/typeorm/repositories/order-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeorm } from './infra/database/typeorm/entities/order.entity';
import { OrderItemTypeorm } from './infra/database/typeorm/entities/item-order.entity';
import { GetOrderUseCase } from './application/get-order';

@Module({
    imports: [TypeOrmModule.forFeature([OrderTypeorm, OrderItemTypeorm])],
    controllers: [OrderController],
    providers: [
        OrderGateway,
        CreateOrderUseCase,
        GetOrderUseCase,
        {
            provide: 'OrderRepository',
            useClass: OrderTypeormRepository,
        },
    ],
})
export class OrderModule {}
