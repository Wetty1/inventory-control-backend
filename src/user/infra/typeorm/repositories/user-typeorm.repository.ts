import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeorm } from '../entities/user.entity';
import { User } from 'src/user/domain/user';
import { UserRepository } from 'src/user/domain/user.repository';

@Injectable()
export class UserTypeormRepository implements UserRepository {
    constructor(
        @InjectRepository(UserTypeorm)
        private readonly userRepository: Repository<UserTypeorm>,
    ) {}
    async createNewUser(user: User): Promise<User> {
        const newUser = UserTypeorm.from(user);

        const newUserPrepared = this.userRepository.create(newUser);
        console.log(newUserPrepared);
        return this.userRepository.save(newUserPrepared);
    }
    async getById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
    async changePassword(id: string, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
        await this.userRepository.save(user);
    }
    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
}
