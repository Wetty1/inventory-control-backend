import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';
import { UserMemoryRepository } from '../gateways/implementations/user-memory-repository';
import { ChangePasswordService } from './change-password.service';
import { GetByIdService } from './get-by-id.service';

describe('CreateUserService', () => {
    let service: CreateUserService;
    const userRepository: IUserRepository = new UserMemoryRepository();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangePasswordService,
                GetByIdService,
                CreateUserService,
                {
                    provide: 'IUserRepository',
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
