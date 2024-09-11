import { Category } from './category';

export interface CategoryRepository {
    getById(id: any): Promise<Category>;
    createOrUpdate(category: Category): Promise<Category>;
    delete(id: any): Promise<void>;
    list(): Promise<Category[]>;
}
