import { ProductRepository } from './product-repository';

export class CreateProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
        const createdProduct = await this.productRepository.saveProduct(input);
        return createdProduct;
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
    name: string;
    price: number;
    quantity: number;
    category: string;
    date: Date;
};
