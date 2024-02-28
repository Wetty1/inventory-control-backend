import { Global, Module } from '@nestjs/common';
import { ConnectionFactory } from './infra/typeorm/connection.factory';

@Global()
@Module({
    providers: [ConnectionFactory],
    exports: [ConnectionFactory],
})
export class SharedModule {}
