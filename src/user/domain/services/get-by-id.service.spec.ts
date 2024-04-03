import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdService } from './get-by-id.service';
import { ChangePasswordService } from './change-password.service';
import { CreateUserService } from './create-user.service';
import { UserMemoryRepository } from '../../infra/memory/user-memory-repository';
import { UserRepository } from '../repositories/user.repository';

describe('GetByIdService', () => {
    let service: GetByIdService;
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

        service = module.get<GetByIdService>(GetByIdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get user by id', async () => {
        userRepository.createNewUser({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456',
            hashPassword: () => {},
        });
        const user = await service.execute(1);
        expect(user.id).toBe(1);
    });
});
