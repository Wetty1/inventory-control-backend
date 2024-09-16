import { Category } from '../../../domain/category';
import { CategoryRepository } from '../../../domain/category.repository';

export class CategoryInMemoryRepository implements CategoryRepository {
    private categories: Category[];
    constructor() {
        this.categories = [];
    }

    async save(category: Category): Promise<Category> {
        const index = this.categories.findIndex((c) => c.id === category.id);

        if (index === -1) {
            this.categories.push(category);
            return category;
        }
        this.categories[index] = category;
        return category;
    }

    async delete(id: any): Promise<void> {
        const index = this.categories.findIndex(
            (category) => category.id === id,
        );
        if (index === -1) throw new Error('Category not found');
        this.categories.splice(index, 1);
    }

    async get(id: string): Promise<Category> {
        return this.categories.find((category) => category.id === id);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }
}
