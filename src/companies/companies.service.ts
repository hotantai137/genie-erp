import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Company } from './company.entity'

@Injectable()
export class CompaniesService {
  private companiesRepository
  constructor(
    // @Inject('COMPANY_REPOSITORY')
    // @InjectRepository(Company)
    // private companiesRepository: Repository<Company>,
    private dataSource: DataSource
  ) {
    this.companiesRepository = this.dataSource.getRepository(Company);
  }

  findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companiesRepository.findOneBy({ id });
  }

  findOneByCode(name: string): Promise<Company | null> {
    console.log(name);
    return this.companiesRepository.findOneBy({ COMPANYTAXID: name });
  }

  async create(data: any): Promise<Company[]> {
    const company = this.companiesRepository.create(data);
    await this.companiesRepository.save(company);
    return company;
  }

  async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}