import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { ChangePasswordService } from './change-password.service';
import { GetByIdService } from './get-by-id.service';
import { UserMemoryRepository } from '../../infra/memory/user-memory-repository';
import { UserRepository } from '../repositories/user.repository';

describe('CreateUserService', () => {
    let service: CreateUserService;
    const userRepository: UserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangePasswordService,
                GetByIdService,
                CreateUserService,
                {
                    provide: 'UserRepository',
                    useValue: userRepository,
                },
            ],
        }).compile();

        service = module.get<CreateUserService>(CreateUserService);
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
        userRepository.createNewUser({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456',
            hashPassword: () => {},
        });
        await expect(
            service.execute({
                name: 'John Doe',
                email: 'a@a.com',
                password: '123456',
            }),
        ).rejects.toThrowError('User already exists');
    });
});
