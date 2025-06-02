import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/repository/user.repository';

@Injectable()
export class ChangeUserPassword {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}
    async execute(input: Input) {
        const { id, newPassword } = input;
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.changePassword(newPassword);
        return this.userRepository.changePassword(id, newPassword);
    }
}

type Input = {
    id: number;
    newPassword: string;
};
