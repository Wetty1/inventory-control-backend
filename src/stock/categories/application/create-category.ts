import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category.repository';

@Injectable()
export class CreateCategory {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryStore: CategoryRepository,
    ) {}

    async execute(input: any): Promise<Category> {
        const newCategory = Category.create(input.name);
        const createdCategory =
            await this.categoryStore.save(newCategory);
        return createdCategory;
    }
}
