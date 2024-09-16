export class Category {
    private constructor(
        public id: string,
        public name: string,
    ) {}

    static create(name: string) {
        const id = crypto.randomUUID();
        return new Category(id, name);
    }

    static restore(id: string, name: string) {
        return new Category(id, name);
    }
}
