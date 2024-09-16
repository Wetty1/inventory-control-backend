export class ProductName {
    constructor(private readonly name: string) {
        this.name = name;
    }

    getValue() {
        return this.name;
    }
}
