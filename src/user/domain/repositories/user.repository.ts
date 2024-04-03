import { User } from '../entities/user';

export interface UserRepository {
    createNewUser(user: User): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    changePassword(id: number, password: string): Promise<void>;
}
