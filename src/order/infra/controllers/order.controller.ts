import { Controller, Post } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Controller('order')
export class OrderController {
    private io: Socket;

    constructor() {
        this.io = io('http://localhost:3000', { transports: ['websocket'] });
    }

    @Post()
    async create() {
        this.io.emit('newOrder', `teste`);
        return 'create order';
    }
}
