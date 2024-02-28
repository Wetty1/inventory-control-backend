import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category';
import { CategoryStoreGateway } from '../interfaces/category-store-gateway.interface';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { CategoryORM } from '../interfaces/category.entity';
import { ListCategoryDto } from '../../dto/category.dto';

@Injectable()
export class CategoryStoreTypeorm implements CategoryStoreGateway {
    constructor(
        @InjectRepository(CategoryORM)
        private readonly repository: Repository<CategoryORM>,
    ) {}

    async create(category: Category): Promise<Category> {
        const categoryCreated = await this.repository.create({
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

    async list(data: ListCategoryDto): Promise<Category[]> {
        return await this.repository.find({
            skip: (data.page - 1) * data.limit,
            take: data.limit,
            where: {
                name: Like(`%${data.search}%`),
            },
        });
    }
}
