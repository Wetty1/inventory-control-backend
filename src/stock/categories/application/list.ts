import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category.repository';

@Injectable()
export class ListCategory {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryStore: CategoryRepository,
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryStore.list();
        return categories;
    }
}
