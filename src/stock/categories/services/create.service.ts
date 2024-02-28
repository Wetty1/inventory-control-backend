import { Inject, Injectable } from '@nestjs/common';
import { CategoryStoreGateway } from '../gateways/interfaces/category-store-gateway.interface';
import { Category } from '../entities/category';

@Injectable()
export class CreateService {
    constructor(
        @Inject('CategoryStoreGateway')
        private readonly categoryStore: CategoryStoreGateway,
    ) {}

    async execute(newCategory: Category): Promise<Category> {
        const createdCategory = await this.categoryStore.create(newCategory);
        return createdCategory;
    }
}
