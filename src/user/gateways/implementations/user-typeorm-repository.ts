import { Injectable } from '@nestjs/common';
import { UserModel } from '../../dtos/user-entity';
import { UserCreateDto } from '../../dtos/user.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../interfaces/user-typeorm.entity';

@Injectable()
export class UserTypeormRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
    ) {}
    async createNewUser(user: UserCreateDto): Promise<UserModel> {
        const newUser = new UserModel();
        Object.assign(newUser, user);

        const newUserPrepared = this.userRepository.create(newUser);
        console.log(newUserPrepared);
        return this.userRepository.save(newUserPrepared);
    }
    async getById(id: number): Promise<UserModel> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
        await this.userRepository.save(user);
    }
    async getByEmail(email: string): Promise<UserModel> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
}
