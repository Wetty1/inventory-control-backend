import { Category } from './category';

export interface CategoryRepository {
    get(id: string): Promise<Category>;
    save(category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
    list(): Promise<Category[]>;
}
