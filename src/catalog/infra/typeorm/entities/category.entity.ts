import { Category } from 'src/catalog/domain/entity/category';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryTypeorm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    static from(category: Category): CategoryTypeorm {
        const categoryTypeorm = new CategoryTypeorm();
        categoryTypeorm.id = category.getId();
        categoryTypeorm.name = category.getName();
        return categoryTypeorm;
    }

    static to(categoryTypeorm: CategoryTypeorm): Category {
        const category = Category.restore(
            categoryTypeorm.id,
            categoryTypeorm.name,
        );
        return category;
    }
}
