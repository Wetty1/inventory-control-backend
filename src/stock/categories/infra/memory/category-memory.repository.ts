import { CategoryRepository } from '../../domain/category.repository';
import { Category } from '../../domain/category';

export class CategoryMemoryRepository implements CategoryRepository {
    private categories: Category[];
    constructor() {
        this.categories = [];
    }

    async save(category: Category): Promise<Category> {
        this.categories.push(category);
        return category;
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
