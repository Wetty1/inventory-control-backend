import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class DeleteCategoryService {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryRepository: CategoryRepository,
    ) {}
    async execute(id) {
        return this.categoryRepository.delete(id);
    }
}
