import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { companyProviders } from './company.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...companyProviders, CompaniesService],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
