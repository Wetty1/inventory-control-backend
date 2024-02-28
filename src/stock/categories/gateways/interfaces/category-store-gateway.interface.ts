import { ListCategoryDto } from '../../dto/category.dto';
import { Category } from '../../entities/category';

export interface CategoryStoreGateway {
    getById(id: any): Promise<Category>;
    create(category: Category): Promise<Category>;
    delete(id: any): Promise<void>;
    update(category: Category): Promise<Category>;
    list(data: ListCategoryDto): Promise<Category[]>;
}
