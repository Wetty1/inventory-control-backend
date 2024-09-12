import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserCreateDto } from 'src/user/infra/dtos/user-create.dto';
import { User } from '../domain/user';

@Injectable()
export class CreateUser {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}

    async execute(userNew: UserCreateDto) {
        const userExists = await this.userRepository.getByEmail(userNew.email);
        if (userExists) {
            throw new UnauthorizedException('User already exists');
        }

        const user: User = User.create(
            userNew.name,
            userNew.password,
            userNew.email,
        );

        return this.userRepository.createNewUser(user);
    }
}
