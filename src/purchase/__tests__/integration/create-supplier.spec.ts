import { Test, TestingModule } from '@nestjs/testing';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';

describe('CreateSupplierService', () => {
    let createSupplier: CreateSupplier;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRootAsync({
                    imports: [SharedModule],
                    useFactory: async (dbProvider: ConnectionFactory) =>
                        dbProvider.createTypeOrmOptions(),
                    inject: [ConnectionFactory],
                }),
                TypeOrmModule.forFeature([SupplierTypeorm]),
            ],
            providers: [
                CreateSupplier,
                {
                    provide: 'SupplierRepository',
                    useClass: SupplierTypeormRepository,
                },
            ],
        }).compile();

        createSupplier = module.get<CreateSupplier>(CreateSupplier);
    });

    it('should be defined', () => {
        expect(createSupplier).toBeDefined();
    });

    it('should create a new supplier', async () => {
        const input = {
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        };
        const output = await createSupplier.execute(input);
        expect(output).toHaveProperty('id');
    });
});
