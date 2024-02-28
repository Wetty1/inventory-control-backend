import { Inject, Injectable } from '@nestjs/common';
import { CategoryStoreGateway } from '../gateways/interfaces/category-store-gateway.interface';
import { Category } from '../entities/category';
import { ListCategoryDto } from '../dto/category.dto';

@Injectable()
export class ListService {
    constructor(
        @Inject('CategoryStoreGateway')
        private readonly categoryStore: CategoryStoreGateway,
    ) {}

    async execute(data: ListCategoryDto): Promise<Category[]> {
        const categories = await this.categoryStore.list(data);
        return categories;
    }
}
