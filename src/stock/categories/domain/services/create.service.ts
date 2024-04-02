import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../entities/category';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CreateService {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryStore: CategoryRepository,
    ) {}

    async execute(newCategory: Category): Promise<Category> {
        const createdCategory = await this.categoryStore.create(newCategory);
        return createdCategory;
    }
}
