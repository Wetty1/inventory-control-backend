import { Test, TestingModule } from '@nestjs/testing';
import { ChangeUserPassword } from './change-password';
import { GetByIdService } from './get-by-id';
import { CreateUser } from './create-user';
import { UserRepository } from '../domain/user.repository';
import { UserMemoryRepository } from '../infra/memory/user-memory-repository';
import { User } from '../domain/user';

describe('ChangePasswordService', () => {
    let service: ChangeUserPassword;
    const userRepository: UserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeUserPassword,
                GetByIdService,
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
        userRepository.createNewUser(user);
        await service.execute(user.id, '123457');
        const userFound = await userRepository.getById(user.id);
        expect(userFound.password).toEqual('123457');
    });
});
