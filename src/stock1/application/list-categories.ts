import { Inject } from '@nestjs/common';
import { CategoryRepository } from '../domain/category.repository';

export class ListCategories {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async execute() {
        return await this.categoryRepository.list();
    }
}
