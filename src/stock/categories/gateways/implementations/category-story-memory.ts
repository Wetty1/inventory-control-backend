import { ListCategoryDto } from '../../dto/category.dto';
import { Category } from '../../entities/category';
import { CategoryStoreGateway } from '../interfaces/category-store-gateway.interface';

export class CategoryStoreMemory implements CategoryStoreGateway {
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
        const index = this.categories.findIndex((category) => category.id === id);
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

    async list(data: ListCategoryDto): Promise<Category[]> {
        return this.categories
            .filter((category) => category.name.includes(data.search))
            .slice((data.page - 1) * data.limit, data.page * data.limit);
    }
}
