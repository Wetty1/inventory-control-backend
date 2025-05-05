import { Inject } from '@nestjs/common';
import { Product } from 'src/catalog/domain/entity/product';
import { ProductRepository } from 'src/catalog/domain/repository/product.repository';

interface Input {
    name: string;
    categoryId: number;
}

interface Output {
    id: number;
    name: string;
}

export class CreateProduct {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
        const product = Product.create(input.name, input.categoryId);
        const productCreated = await this.productRepository.save(product);
        return { id: productCreated.getId(), name: productCreated.getName() };
    }
}
