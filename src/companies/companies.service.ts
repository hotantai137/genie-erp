import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity'

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companiesRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companiesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}