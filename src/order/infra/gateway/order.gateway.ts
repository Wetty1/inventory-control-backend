import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class OrderGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('OrderGateway');
    constructor() {}

    @WebSocketServer() wss: Server;

    afterInit(server: any) {
        this.logger.log('Init');
    }
    handleConnection(client: any, ...args: any[]) {
        this.logger.log('Connection');
    }
    handleDisconnect(client: any) {
        this.logger.log('Disconnection');
    }

    @SubscribeMessage('enterRoom')
    handleEnterRoom(client: Socket, payload: any): void {
        this.logger.log({ client, payload });
        client.join('orders');
        client.emit('success', 'connected in room: orders');
    }

    @SubscribeMessage('newOrder')
    handleMessage(client: Socket, payload: any): string {
        console.log(payload);
        return 'Hello world!';
    }
}
