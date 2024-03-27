import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CreateService } from './services/create.service';
import { GetByIdService } from './services/get-by-id.service';
import { ListService } from './services/list.service';
import { CategoryStoreTypeorm } from './gateways/implementations/category-story-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryORM } from './gateways/interfaces/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryORM])],
    controllers: [CategoriesController],
    providers: [
        CreateService,
        GetByIdService,
        ListService,
        {
            provide: 'CategoryStoreGateway',
            useClass: CategoryStoreTypeorm,
        },
    ],
})
export class CategoriesModule {}
