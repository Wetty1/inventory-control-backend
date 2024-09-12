import { User } from '../domain/user';

export interface UserRepository {
    createNewUser(user: User): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getById(id: string): Promise<User>;
    changePassword(id: string, password: string): Promise<void>;
}
