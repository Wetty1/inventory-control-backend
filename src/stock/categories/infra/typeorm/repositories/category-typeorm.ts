import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../domain/entities/category';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryRepository } from 'src/stock/categories/domain/repositories/category.repository';
import { CategoryTypeorm } from '../entities/category.entity';

@Injectable()
export class CategoryTypeormRepository implements CategoryRepository {
    constructor(
        @InjectRepository(CategoryTypeorm)
        private readonly repository: Repository<CategoryTypeorm>,
    ) {}

    async create(category: Category): Promise<Category> {
        const categoryCreated = this.repository.create({
            name: category.name,
        });
        return await this.repository.save(categoryCreated);
    }
    async delete(id: any): Promise<void> {
        await this.repository.delete(id);
    }
    async update(category: Category): Promise<Category> {
        await this.repository.update(category.id, category);
        return category;
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
