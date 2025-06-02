export class User {
    private id: number | undefined;
    private name: string;
    private password: string;
    private email: string;
    private role: string;
    private status: string;

    private constructor(
        id: number | undefined,
        name: string,
        password: string,
        email: string,
        role: string = 'user',
        status: string = 'active',
    ) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    static create(name: string, password: string, email: string) {
        const status = 'active';
        const role = 'user';
        return new User(null, name, password, email, role, status);
    }

    static restore(
        id: number,
        name: string,
        password: string,
        email: string,
        role: string,
        status: string,
    ) {
        return new User(id, name, password, email, role, status);
    }

    changePassword(password: string) {
        if (this.status !== 'active') {
            throw new Error('User is not active');
        }
        this.password = password;
    }

    deactive() {
        this.status = 'deactive';
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }

    getStatus() {
        return this.status;
    }
}
