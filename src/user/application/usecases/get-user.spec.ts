import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryRepository } from '../../infra/memory/user-memory-repository';
import { UserRepository } from '../../application/repository/user.repository';
import { User } from '../../domain/user';
import { GetUser } from './get-user';
import { CreateUser } from './create-user';

describe('GetUser', () => {
    let usecase: GetUser;
    const userRepository: UserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUser,
                CreateUser,
                {
                    provide: 'UserRepository',
                    useValue: userRepository,
                },
            ],
        }).compile();

        usecase = module.get<GetUser>(GetUser);
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    it('should get user by id', async () => {
        const user = User.create('John Doe', '123456', 'a@a.com');
        const userCreated = await userRepository.createNewUser(user);

        const userFounded = await usecase.execute({ id: userCreated.getId() });
        expect(userFounded.getId()).toBe(userCreated.getId());
    });

    it('should throw error if user not found', async () => {
        await expect(usecase.execute({ id: 99999 })).rejects.toThrow();
    });
});
