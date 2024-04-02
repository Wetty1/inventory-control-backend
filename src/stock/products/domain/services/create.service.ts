import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../entities/product';
import { ProductRepository } from '../Repositories/product.repository';

@Injectable()
export class CreateService {
    constructor(
        @Inject('ProductRepository')
        private readonly productStore: ProductRepository,
    ) {}

    async execute(product: Product): Promise<Product> {
        const createdProduct = await this.productStore.create(product);
        return createdProduct;
    }
}
