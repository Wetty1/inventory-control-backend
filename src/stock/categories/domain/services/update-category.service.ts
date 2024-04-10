import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class UpdateCategoryService {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryRepository: CategoryRepository,
    ) {}
    async execute(id, data) {
        const category = await this.categoryRepository.getById(id);
        Object.assign(category, data);
        return this.categoryRepository.update(category);
    }
}
