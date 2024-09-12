import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class ChangeUserPassword {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}
    async execute(id: string, newPassword: string) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.userRepository.changePassword(id, newPassword);
    }
}
