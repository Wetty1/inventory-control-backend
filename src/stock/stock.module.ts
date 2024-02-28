import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, EventsModule, CategoriesModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockModule {}
