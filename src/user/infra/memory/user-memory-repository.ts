import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

export class UserMemoryRepository implements UserRepository {
    private users: User[] = [];

    constructor() {
        this.users = [];
    }
    async createNewUser(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
    async getByEmail(email: string): Promise<User> {
        return this.users.find((u) => u.email === email);
    }
    async getById(id: string): Promise<User> {
        return this.users.find((u) => u.id === id);
    }
    async changePassword(id: string, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
    }
}
