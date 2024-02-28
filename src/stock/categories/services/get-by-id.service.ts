import { Inject, Injectable } from '@nestjs/common';
import { CategoryStoreGateway } from '../gateways/interfaces/category-store-gateway.interface';
import { Category } from '../entities/category';

@Injectable()
export class GetByIdService {
    constructor(
        @Inject('CategoryStoreGateway')
        private readonly categoryStore: CategoryStoreGateway,
    ) {}

    async execute(id: any): Promise<Category> {
        const category = await this.categoryStore.getById(id);
        return category;
    }
}
