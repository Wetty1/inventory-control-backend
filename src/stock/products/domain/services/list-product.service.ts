import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../Repositories/product.repository';

@Injectable()
export class ListProductService {
    constructor(
        @Inject('ProductRepository')
        private readonly productRepository: ProductRepository,
    ) {}
    async execute() {
        return this.productRepository.listAll();
    }
}
