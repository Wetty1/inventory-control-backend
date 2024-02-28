import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CreateService } from './services/create.service';
import { GetByIdService } from './services/get-by-id.service';
import { ListService } from './services/list.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    CreateService,
    GetByIdService,
    ListService,
    {
      provide: 'CategoryStoreGateway',
      useValue: {},
    },
  ],
})
export class CategoriesModule {}
