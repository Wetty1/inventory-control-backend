import { Test, TestingModule } from '@nestjs/testing';
import { Login } from '../../application/usecase/login';
import { JwtModule } from '@nestjs/jwt';
import { CreateUser } from 'src/user/application/usecase/create-user';
import { UserMemoryRepository } from 'src/user/infra/memory/user-memory-repository';

describe('Login', () => {
    let service: Login;
    let createUser: CreateUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    privateKey: 'TESTE@!@!',
                    signOptions: { expiresIn: '1d' },
                }),
            ],
            providers: [
                Login,
                CreateUser,
                {
                    provide: 'UserRepository',
                    useClass: UserMemoryRepository,
                },
            ],
        }).compile();

        service = module.get<Login>(Login);
        createUser = module.get<CreateUser>(CreateUser);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a token', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'a@a.com',
            password: '123456',
        });

        const input = {
            id: 1,
            email: 'a@a.com',
        };
        const output = await service.execute(input);
        expect(output).toHaveProperty('token');
    });
});
