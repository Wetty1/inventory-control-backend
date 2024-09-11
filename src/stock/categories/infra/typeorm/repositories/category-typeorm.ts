import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../domain/category';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryRepository } from 'src/stock/categories/domain/category.repository';
import { CategoryTypeorm } from '../entities/category.entity';

@Injectable()
export class CategoryTypeormRepository implements CategoryRepository {
    constructor(
        @InjectRepository(CategoryTypeorm)
        private readonly repository: Repository<CategoryTypeorm>,
    ) {}

    async createOrUpdate(category: Category): Promise<Category> {
        const preparedCategory: CategoryTypeorm = new CategoryTypeorm();
        preparedCategory.id = category.id;
        preparedCategory.name = category.name;
        const categoryCreated = await this.repository.save(preparedCategory);
        return categoryCreated.toCategory();
    }

    async delete(id: any): Promise<void> {
        await this.repository.delete(id);
    }

    async getById(id: any): Promise<Category> {
        return await this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async list(): Promise<Category[]> {
        return await this.repository.find();
    }
}
