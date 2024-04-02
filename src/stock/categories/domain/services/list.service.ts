import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../entities/category';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class ListService {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryStore: CategoryRepository,
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryStore.list();
        return categories;
    }
}
