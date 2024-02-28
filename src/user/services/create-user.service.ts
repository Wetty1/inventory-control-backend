import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from '../dtos/user.dto';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(newUser: UserCreateDto) {
        const user = await this.userRepository.getByEmail(newUser.email);
        if (user) {
            throw new Error('User already exists');
        }
        return this.userRepository.createNewUser(newUser);
    }
}
