import { Test, TestingModule } from '@nestjs/testing';
import { ChangeUserPassword } from './change-password';
import { CreateUser } from './create-user';
import { UserRepository } from '../repository/user.repository';
import { UserMemoryRepository } from '../../infra/memory/user-memory-repository';
import { User } from '../../domain/user';

describe('ChangePasswordService', () => {
    let service: ChangeUserPassword;
    const userRepository: UserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeUserPassword,
                CreateUser,
                {
                    provide: 'UserRepository',
                    useValue: userRepository,
                },
            ],
        }).compile();

        service = module.get<ChangeUserPassword>(ChangeUserPassword);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should change password', async () => {
        const user = User.create('John Doe', '123456', 'a@a.com');
        const userCreated = await userRepository.createNewUser(user);
        await service.execute({
            id: userCreated.getId(),
            newPassword: '123457',
        });
        const userFound = await userRepository.getById(userCreated.getId());
        expect(userFound.getPassword()).toEqual('123457');
    });

    it('should throw error if user not found', async () => {
        await expect(
            service.execute({
                id: 9999,
                newPassword: '123457',
            }),
        ).rejects.toThrowError('User not found');
    });

    it('should throw error if user inactive', async () => {
        const user = User.create('John Doe', '123456', 'a@a.com');
        user.deactive();
        const userCreated = await userRepository.createNewUser(user);

        await expect(
            service.execute({ id: userCreated.getId(), newPassword: '123457' }),
        ).rejects.toThrowError('User is not active');
    });
});
