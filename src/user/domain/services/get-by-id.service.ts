import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetByIdService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}

    async execute(id: number) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
