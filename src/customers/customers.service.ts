import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Customer } from './customer.entity'
import { PageOptionsDto } from 'src/common/pageOptions.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/page.dto';
import { CustomerDto } from './dtos/customerCreate.dto';
import { CustomerChangePwdDto } from './dtos/customerChangePwd.dto';

@Injectable()
export class CustomersService {
  private customersRepository;
  constructor(
    private dataSource: DataSource
  ) {
    this.customersRepository = this.dataSource.getRepository(Customer);
  }

  async findAll(pageOptionsDto: PageOptionsDto,): Promise<PageDto<Customer>> {
    const queryBuilder = this.customersRepository.createQueryBuilder();
    queryBuilder
      .orderBy("createdAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Customer | null> {
    return await this.customersRepository.findOneBy({ id });
  }

  async findOnePhoneNumber(phoneNumber: string): Promise<Customer | null> {
    console.log(phoneNumber);
    const customer = await this.customersRepository.findOneBy({ phoneNumber: phoneNumber, isActive: 1 });
    console.log(customer);
    return customer;
  }

  async create(data: CustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(data);
    await this.customersRepository.insert(customer);
    return customer;
  }

  async update(customer: CustomerDto) {
    const customerOld = await this.customersRepository.findOneBy({ phoneNumber: customer.phoneNumber });
    if(customerOld) {
      const result = await this.customersRepository.update(customerOld.id, customer);

      return result;
    }
   
    return null;
  }

  async updatePassword(customer: CustomerChangePwdDto) {
    const customerOld = await this.customersRepository.findOneBy({ phoneNumber: customer.phoneNumber });
    if(customerOld) {
      
      const result = await this.customersRepository.update(customerOld.id, customer);

      return result;
    }
   
    return null;
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}