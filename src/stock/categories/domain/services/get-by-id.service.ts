import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../entities/category';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class GetByIdService {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryStore: CategoryRepository,
    ) {}

    async execute(id: any): Promise<Category> {
        const category = await this.categoryStore.getById(id);
        return category;
    }
}
