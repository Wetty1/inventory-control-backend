import { Category } from 'src/catalog/domain/entity/category';
import { CategoryRepository } from 'src/catalog/domain/repository/category.repository';

export class CategoryInMemoryRepository implements CategoryRepository {
    private categories: Category[];
    constructor() {
        this.categories = [];
    }

    async save(category: Category): Promise<Category> {
        const index = this.categories.findIndex(
            (c) => c.getId() === category.getId(),
        );

        if (index === -1) {
            this.categories.push(category);
            return category;
        }
        this.categories[index] = category;
        return category;
    }

    async delete(id: any): Promise<void> {
        const index = this.categories.findIndex(
            (category) => category.getId() === id,
        );
        if (index === -1) throw new Error('Category not found');
        this.categories.splice(index, 1);
    }

    async get(id: number): Promise<Category> {
        return this.categories.find((category) => category.getId() === id);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }
}
