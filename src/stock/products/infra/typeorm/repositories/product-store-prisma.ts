import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../domain/entities/product';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/stock/products/domain/Repositories/product.repository';
import { ProductTypeorm } from '../entities/product.entity';

export class ProductStoreTypeorm implements ProductRepository {
    constructor(
        @InjectRepository(ProductTypeorm)
        private readonly productRepository: Repository<ProductTypeorm>,
    ) {}
    async listAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async listAllSummaries(): Promise<any[]> {
        return this.productRepository.query(`select 	
            p.id,
            p.name as name,
            c.name as categoryName,
            (select pur.unit_value
                from purchases pur
                order by pur."date" desc 
                limit 1) as lastPrice,
            (select 
                (select coalesce(sum(quantity),0)
                    from events e
                    where e."productId" = p.id and e."type" = 'entrada') -
                (select coalesce(sum(quantity),0)
                    from events e
                    where e."productId" = p.id and e."type" = 'saida')) as balance
            from products p 
            join categories c ON c.id = p."categoryId"`);
    }

    async getProductsByCategory(categoryId: any): Promise<Product[]> {
        return this.productRepository.find({
            where: { categoryId },
        });
    }
    async get(id: any): Promise<Product> {
        return this.productRepository.findOne({
            where: { id },
            relations: ['events', 'events.purchase', 'category'],
        });
    }
    async create(product: Product): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }
    async delete(id: any): Promise<void> {
        await this.productRepository.delete(id);
    }
    async update(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async listAllWithEvents() {
        return this.productRepository.find({
            relations: ['events'],
            select: ['id', 'name', 'events'],
        });
    }
}
