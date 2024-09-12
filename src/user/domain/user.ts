export class User {
    private constructor(
        public readonly id: string,
        public name: string,
        public password: string,
        public email: string,
    ) {}

    static create(name: string, password: string, email: string) {
        const id = crypto.randomUUID();
        return new User(id, name, password, email);
    }

    static restore(id: string, name: string, password: string, email: string) {
        return new User(id, name, password, email);
    }
}
