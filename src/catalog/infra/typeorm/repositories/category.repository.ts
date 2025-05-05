import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/catalog/domain/entity/category';
import { CategoryRepository } from 'src/catalog/domain/repository/category.repository';
import { Repository } from 'typeorm';
import { CategoryTypeorm } from '../entities/category.entity';

export class CategoryTyperormRepository implements CategoryRepository {
    constructor(
        @InjectRepository(CategoryTypeorm)
        private readonly categoryTypeormRepository: Repository<CategoryTypeorm>,
    ) {}

    async get(id: number): Promise<Category> {
        const category = await this.categoryTypeormRepository.findOne({
            where: { id },
        });
        return CategoryTypeorm.to(category);
    }
    async save(category: Category): Promise<Category> {
        const categoryTypeorm = CategoryTypeorm.from(category);
        const categorySaved =
            await this.categoryTypeormRepository.save(categoryTypeorm);
        return CategoryTypeorm.to(categorySaved);
    }
    async delete(id: number): Promise<void> {
        await this.categoryTypeormRepository.delete(id);
    }
}
