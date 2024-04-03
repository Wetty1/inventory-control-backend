import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserCreateDto } from 'src/user/infra/dtos/user-create.dto';
import { User } from '../entities/user';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}

    async execute(newUser: UserCreateDto) {
        const userExists = await this.userRepository.getByEmail(newUser.email);
        if (userExists) {
            throw new Error('User already exists');
        }

        const user = new User();
        Object.assign(user, newUser);

        return this.userRepository.createNewUser(user);
    }
}
