import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class GetUser {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}

    async execute(input: Input) {
        const user = await this.userRepository.getById(input.id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

type Input = {
    id: number;
};
