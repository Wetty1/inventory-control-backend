import { User } from '../../../user/domain/entities/user';
import { UserRepository } from '../../../user/domain/repositories/user.repository';

export class UserMemoryRepository implements UserRepository {
    private users: User[] = [];

    constructor() {
        this.users = [];
    }
    async createNewUser(user: User): Promise<User> {
        const newUser = new User();
        newUser.id = this.users.length + 1;
        Object.assign(newUser, user);
        this.users.push(newUser);
        return newUser;
    }
    async getByEmail(email: string): Promise<User> {
        return this.users.find((u) => u.email === email);
    }
    async getById(id: number): Promise<User> {
        return this.users.find((u) => u.id === id);
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
    }
}
