import { Test, TestingModule } from '@nestjs/testing';
import { GetSupplier } from 'src/purchase/application/usecases/get-supplier';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionFactory } from 'src/@shared/infra/typeorm/connection.factory';
import { SharedModule } from 'src/@shared/shared.module';
import { CreateSupplier } from 'src/purchase/application/usecases/create-supplier';
import { SupplierTypeorm } from 'src/purchase/infra/typeorm/entities/supplier.entity';
import { SupplierTypeormRepository } from 'src/purchase/infra/typeorm/repository/supplier.entity';

describe('GetSupplier', () => {
    let getSupplier: GetSupplier;
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
                GetSupplier,
                {
                    provide: 'SupplierRepository',
                    useClass: SupplierTypeormRepository,
                },
            ],
        }).compile();

        getSupplier = module.get<GetSupplier>(GetSupplier);
        createSupplier = module.get<CreateSupplier>(CreateSupplier);
    });

    it('should be defined', () => {
        expect(getSupplier).toBeDefined();
    });

    it('should get a supplier', async () => {
        const createdSupplier = await createSupplier.execute({
            name: `Supplier ${Math.random()}`,
            address: `Address ${Math.random()}`,
            cnpj: `CNPJ ${Math.random()}`,
        });
        const supplier = await getSupplier.execute({ id: createdSupplier.id });
        expect(supplier).toBeDefined();
        expect(supplier.id).toEqual(createdSupplier.id);
        expect(supplier.name).toEqual(createdSupplier.name);
        expect(supplier.address).toEqual(createdSupplier.address);
        expect(supplier.cnpj).toEqual(createdSupplier.cnpj);
    });
});
