import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';

@Controller('company')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }
}
