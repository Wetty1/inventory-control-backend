import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from './create-user';
import { ChangeUserPassword } from './change-password';
import { GetByIdService } from './get-by-id';
import { UserMemoryRepository } from '../infra/memory/user-memory-repository';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';

describe('CreateUserService', () => {
    let service: CreateUser;
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

        service = module.get<CreateUser>(CreateUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new user', async () => {
        const user = await service.execute({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456',
        });
        expect(user).toBeDefined();
    });

    it('should throw an error if user already exists', async () => {
        const user = User.create('John Doe', '123456', 'a@a.com');
        userRepository.createNewUser(user);

        const anotherUser = User.create('John Doe2', '123456', 'a@a.com');
        await expect(service.execute(anotherUser)).rejects.toThrowError(
            'User already exists',
        );
    });
});
