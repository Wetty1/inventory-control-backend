import { User } from '../../domain/user';
import { UserRepository } from '../../application/repository/user.repository';

export class UserMemoryRepository implements UserRepository {
    private users: User[] = [];

    constructor() {
        this.users = [];
    }
    async createNewUser(user: User): Promise<User> {
        const id = this.users.length + 1;
        const userCreated = User.restore(
            id,
            user.getName(),
            user.getPassword(),
            user.getEmail(),
            user.getRole(),
            user.getStatus(),
        );
        this.users.push(userCreated);
        return userCreated;
    }
    async getByEmail(email: string): Promise<User> {
        return this.users.find((u) => u.getEmail() === email);
    }
    async getById(id: number): Promise<User> {
        return this.users.find((u) => u.getId() === id);
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.changePassword(password);
    }
}
