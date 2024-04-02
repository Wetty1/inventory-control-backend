import { Category } from '../entities/category';

export interface CategoryRepository {
    getById(id: any): Promise<Category>;
    create(category: Category): Promise<Category>;
    delete(id: any): Promise<void>;
    update(category: Category): Promise<Category>;
    list(): Promise<Category[]>;
}
