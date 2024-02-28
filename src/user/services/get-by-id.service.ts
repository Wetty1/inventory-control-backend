import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';

@Injectable()
export class GetByIdService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(id: number) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
