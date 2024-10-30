import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { customerProviders } from './customers.providers';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...customerProviders, CustomersService],
  controllers: [CustomersController],
  exports: [...customerProviders, CustomersService]
})
export class CustomersModule {}
