import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category';

export class CategoryMemoryRepository implements CategoryRepository {
    private categories: Category[];
    constructor() {
        this.categories = [];
    }

    async create(category: Category): Promise<Category> {
        const categoryCreated = { ...category, id: this.categories.length + 1 };
        this.categories.push(categoryCreated);
        return categoryCreated;
    }
    async delete(id: any): Promise<void> {
        const index = this.categories.findIndex(
            (category) => category.id === id,
        );
        if (index === -1) throw new Error('Method not implemented.');
        this.categories.splice(index, 1);
    }
    async update(category: Category): Promise<Category> {
        const index = this.categories.findIndex((c) => c.id === category.id);
        this.categories[index] = category;
        return this.categories[index];
    }

    async getById(id: any): Promise<Category> {
        return this.categories.find((category) => category.id === id);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }
}
