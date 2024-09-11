import { Module } from '@nestjs/common';
import { CategoriesController } from './infra/categories.controller';
import { CreateCategory } from './application/create-category';
import { GetByIdCategory } from './application/get-by-id';
import { ListCategory } from './application/list';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTypeorm } from './infra/typeorm/entities/category.entity';
import { CategoryTypeormRepository } from './infra/typeorm/repositories/category-typeorm';
import { UpdateCategory } from './application/update-category';
import { DeleteCategory } from './application/delete-category';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryTypeorm])],
    controllers: [CategoriesController],
    providers: [
        CreateCategory,
        GetByIdCategory,
        ListCategory,
        {
            provide: 'CategoryRepository',
            useClass: CategoryTypeormRepository,
        },
        UpdateCategory,
        DeleteCategory,
    ],
})
export class CategoriesModule {}
