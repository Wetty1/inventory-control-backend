import { randomUUID as uuid } from 'crypto';

export class Product {
    private constructor(
        readonly id: string,
        readonly name: string,
        readonly price: number,
        readonly quantity: number,
        readonly category: string,
        readonly date: Date,
    ) {}

    static create(
        name: string,
        price: number,
        quantity: number,
        category: string,
    ): Product {
        const productId = uuid();
        return new Product(
            productId,
            name,
            price,
            quantity,
            category,
            new Date(),
        );
    }

    static restore(
        id: string,
        name: string,
        price: number,
        quantity: number,
        category: string,
        date: Date,
    ) {
        return new Product(id, name, price, quantity, category, date);
    }
}
