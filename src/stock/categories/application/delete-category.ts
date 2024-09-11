import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../domain/category.repository';

@Injectable()
export class DeleteCategory {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryRepository: CategoryRepository,
    ) {}
    async execute(id: string) {
        return this.categoryRepository.delete(id);
    }
}
