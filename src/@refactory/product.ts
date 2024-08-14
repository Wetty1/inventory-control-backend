import { randomUUID as uuid } from 'crypto';
import { Name } from './product-name';

export class Product {
    private constructor(
        readonly id: string,
        readonly name: Name,
        readonly category: string,
        readonly date: Date,
    ) {}

    static create(name: string, category: string): Product {
        const productId = uuid();
        return new Product(productId, new Name(name), category, new Date());
    }

    static restore(id: string, name: string, category: string, date: Date) {
        return new Product(id, new Name(name), category, date);
    }

    public isUnique(name: string) {
        if (this.name.getValue() === name) {
            throw new Error('Product name already exists');
        }
    }
}
