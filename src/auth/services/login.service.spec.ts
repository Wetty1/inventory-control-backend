import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';

describe('LoginService', () => {
    let service: LoginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LoginService, JwtService],
        }).compile();

        service = module.get<LoginService>(LoginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
