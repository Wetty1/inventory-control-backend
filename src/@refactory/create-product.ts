import { Product } from './product';
import { ProductRepository } from './product-repository';

export class CreateProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.getByName(input.name);

        product.isUnique(input.name);

        const output = await this.productRepository.saveProduct(
            Product.create(input.name, input.category),
        );

        return {
            id: output.id,
        };
    }
}

type Input = {
    name: string;
    price: number;
    quantity: number;
    category: string;
    date: Date;
};

type Output = {
    id: string;
};
