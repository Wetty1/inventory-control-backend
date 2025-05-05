import { Category } from '../entity/category';

export interface CategoryRepository {
    get(id: number): Promise<Category>;
    save(category: Category): Promise<Category>;
    delete(id: number): Promise<void>;
}
