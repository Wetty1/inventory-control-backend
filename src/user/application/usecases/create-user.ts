import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../../domain/user';

@Injectable()
export class CreateUser {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}

    async execute(input: Input): Promise<User> {
        const userExists = await this.userRepository.getByEmail(input.email);
        if (userExists) {
            throw new UnauthorizedException('User already exists');
        }

        const user: User = User.create(input.name, input.password, input.email);

        return this.userRepository.createNewUser(user);
    }
}

type Input = {
    name: string;
    password: string;
    email: string;
};
