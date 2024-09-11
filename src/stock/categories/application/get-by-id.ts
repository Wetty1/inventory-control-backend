import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category.repository';

@Injectable()
export class GetByIdCategory {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryStore: CategoryRepository,
    ) {}

    async execute(id: string): Promise<Category> {
        const category = await this.categoryStore.getById(id);
        return category;
    }
}
