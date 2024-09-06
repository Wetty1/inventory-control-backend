import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderUseCase } from 'src/order/application/create-order';
import { GetOrderUseCase } from 'src/order/application/get-order';
// import { io, Socket } from 'socket.io-client';

@Controller('order')
export class OrderController {
    // private io: Socket;

    constructor(
        private readonly createOrder: CreateOrderUseCase,
        private readonly getOrder: GetOrderUseCase,
    ) {
        // this.io = io('http://localhost:3000', { transports: ['websocket'] });
    }

    @Post()
    async create(@Body() body: any) {
        // this.io.emit('newOrder', `teste`);
        const output = await this.createOrder.execute(body);
        return output;
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        const output = await this.getOrder.execute(id);

        return output;
    }
}
