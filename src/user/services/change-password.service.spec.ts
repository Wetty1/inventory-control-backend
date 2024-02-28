import { Test, TestingModule } from '@nestjs/testing';
import { ChangePasswordService } from './change-password.service';
import { GetByIdService } from './get-by-id.service';
import { CreateUserService } from './create-user.service';
import { IUserRepository } from '../gateways/interfaces/user-repository.interface';
import { UserMemoryRepository } from '../gateways/implementations/user-memory-repository';

describe('ChangePasswordService', () => {
    let service: ChangePasswordService;
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

        service = module.get<ChangePasswordService>(ChangePasswordService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should change password', async () => {
        userRepository.createNewUser({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456',
        });
        await service.execute(1, '123457');
        const user = await userRepository.getById(1);
        expect(user.password).toEqual('123457');
    });
});
