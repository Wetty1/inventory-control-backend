import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../domain/category.repository';
import { Category } from '../domain/category';

type Input = {
    name: string;
};

@Injectable()
export class CreateCategory {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(input: Input) {
        const category = Category.create(input.name);
        await this.categoryRepository.save(category);
        return category;
    }
}
