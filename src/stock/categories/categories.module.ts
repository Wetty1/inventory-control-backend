import { Module } from '@nestjs/common';
import { CategoriesController } from './infra/categories.controller';
import { CreateService } from './domain/services/create.service';
import { GetByIdService } from './domain/services/get-by-id.service';
import { ListService } from './domain/services/list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTypeorm } from './infra/typeorm/entities/category.entity';
import { CategoryTypeormRepository } from './infra/typeorm/repositories/category-typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryTypeorm])],
    controllers: [CategoriesController],
    providers: [
        CreateService,
        GetByIdService,
        ListService,
        {
            provide: 'CategoryRepository',
            useClass: CategoryTypeormRepository,
        },
    ],
})
export class CategoriesModule {}
