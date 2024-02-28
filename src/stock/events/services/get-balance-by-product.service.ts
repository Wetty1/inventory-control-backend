import { Inject, Injectable } from '@nestjs/common';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';

@Injectable()
export class GetBalanceByProductService {
  constructor(
    @Inject('EventStoreGatewayInterface')
    private readonly eventStore: EventStoreGatewayInterface,
  ) {}

  async execute(productId: number): Promise<number> {
    const balance = await this.eventStore.balanceByProduct(productId);
    return balance;
  }
}
