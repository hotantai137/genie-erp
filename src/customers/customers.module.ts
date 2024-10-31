import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService]
  // exports: [...customerProviders, CustomersService]
})
export class CustomersModule {}
