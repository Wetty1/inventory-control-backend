import { UserModel } from '../../dtos/user-entity';
import { UserCreateDto } from '../../dtos/user.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';

export class UserMemoryRepository implements IUserRepository {
    private users: UserModel[] = [];

    constructor() {
        this.users = [];
    }
    async createNewUser(user: UserCreateDto): Promise<UserModel> {
        const newUser = new UserModel();
        newUser.id = this.users.length + 1;
        Object.assign(newUser, user);
        this.users.push(newUser);
        return newUser;
    }
    async getByEmail(email: string): Promise<UserModel> {
        return this.users.find((u) => u.email === email);
    }
    async getById(id: number): Promise<UserModel> {
        return this.users.find((u) => u.id === id);
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
    }
}
