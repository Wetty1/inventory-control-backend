import { Inject, Injectable } from '@nestjs/common';
import { ProductStoreGateway } from '../gateways/interfaces/product-store-gateway.interface';
import { Product } from '../entities/product';

@Injectable()
export class CreateService {
    constructor(
        @Inject('ProductStoreGateway')
        private readonly productStore: ProductStoreGateway,
    ) {}

    async execute(product: Product): Promise<Product> {
        const createdProduct = await this.productStore.create(product);
        return createdProduct;
    }
}
