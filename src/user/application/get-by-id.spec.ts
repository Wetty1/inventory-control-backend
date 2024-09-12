import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdService } from './get-by-id';
import { ChangeUserPassword } from './change-password';
import { CreateUser } from './create-user';
import { UserMemoryRepository } from '../infra/memory/user-memory-repository';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';

describe('GetById', () => {
    let useCase: GetByIdService;
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

        useCase = module.get<GetByIdService>(GetByIdService);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should get user by id', async () => {
        const user = User.create('John Doe', '123456', 'a@a.com');
        userRepository.createNewUser(user);

        const userFounded = await useCase.execute(user.id);
        expect(userFounded.id).toBe(user.id);
    });
});
