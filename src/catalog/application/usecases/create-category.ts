import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/catalog/domain/entity/category';
import { CategoryRepository } from 'src/catalog/domain/repository/category.repository';

type Input = {
    name: string;
};

@Injectable()
export class CreateCategory {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async execute(input: Input) {
        const category = Category.create(input.name);
        await this.categoryRepository.save(category);
        return category;
    }
}
