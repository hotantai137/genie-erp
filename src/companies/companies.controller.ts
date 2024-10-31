import { Controller, Get, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { Public } from 'src/auth/auth.decorator';

@Controller('company')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Public()
  @Get()
  getAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':code')
  getByCode(@Param('code') code: string): Promise<Company> {
    return this.companiesService.findOneByCode(code);
  }

  
}
