import { Test, TestingModule } from '@nestjs/testing';
import { GetByIdService } from './get-by-id.service';
import { UserMemoryRepository } from '../gateways/implementations/user-memory-repository';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';
import { ChangePasswordService } from './change-password.service';
import { CreateUserService } from './create-user.service';

describe('GetByIdService', () => {
    let service: GetByIdService;
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
        });
        const user = await service.execute(1);
        expect(user.id).toBe(1);
    });
});
