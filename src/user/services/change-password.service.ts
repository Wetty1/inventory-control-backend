import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';

@Injectable()
export class ChangePasswordService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(id: number, newPassword: string) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.userRepository.changePassword(id, newPassword);
    }
}
