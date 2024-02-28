import { UserModel } from '../../dtos/user-entity';
import { UserCreateDto } from '../../dtos/user.dto';

export interface IUserRepository {
    createNewUser(user: UserCreateDto): Promise<UserModel>;
    getByEmail(email: string): Promise<UserModel>;
    getById(id: number): Promise<UserModel>;
    changePassword(id: number, password: string): Promise<void>;
}
