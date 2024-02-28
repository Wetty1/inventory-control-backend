import { Inject, Injectable } from '@nestjs/common';
import { EventStoreGatewayInterface } from '../gateways/interfaces/event-store-gateway.interface';

@Injectable()
export class ExtractByProductService {
  constructor(
    @Inject('EventStoreGatewayInterface')
    private readonly eventStoreGateway: EventStoreGatewayInterface,
  ) {}

  async execute(productId: number) {
    return this.eventStoreGateway.listByProduct(productId);
  }
}
