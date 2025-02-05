import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeorm } from '../entities/user.entity';
import { User } from 'src/user/domain/user';
import { UserRepository } from 'src/user/application/repository/user.repository';

@Injectable()
export class UserTypeormRepository implements UserRepository {
    constructor(
        @InjectRepository(UserTypeorm)
        private readonly userRepository: Repository<UserTypeorm>,
    ) {}
    async createNewUser(user: User): Promise<User> {
        const newUser = UserTypeorm.from(user);
        const userSaved = await this.userRepository.save(newUser);
        return UserTypeorm.to(userSaved);
    }
    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        return UserTypeorm.to(user);
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
        await this.userRepository.save(user);
    }
    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        return UserTypeorm.to(user);
    }
}
