import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './customer.entity'
import { PageOptionsDto } from 'src/common/pageOptions.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/page.dto';
import { CustomerDto } from './dtos/customerCreate.dto';
import { CustomerChangePwdDto } from './dtos/customerChangePwd.dto';
import * as bcrypt from 'bcrypt';
import { BaseResponseDto } from 'src/common/base-response.dto';
import moment from 'moment';

@Injectable()
export class CustomersService {
  private customersRepository: Repository<Customer>;
  private SALT_OR_ROUNDS = 10;
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

  findOneByPhone(phoneNumber: string): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ phoneNumber });
  }

  async findOnePhoneNumber(phoneNumber: string): Promise<Customer | null> {
    console.log(phoneNumber);
    const customer = await this.customersRepository.findOneBy({ phoneNumber: phoneNumber, isActive: 1 });
    console.log(customer);
    return customer;
  }

  async create(data: CustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(data);
    customer.createdAt = moment().format('YYYYMMDDHHmmss');
    await this.customersRepository.insert(customer);
    return customer;
  }

  async update(customer: CustomerDto) {
    const response = new BaseResponseDto('Update customer success', 1);
    const customerOld = await this.customersRepository.findOneBy({ phoneNumber: customer.phoneNumber });
    if(customerOld) {
      customerOld.updatedAt = moment().format('YYYYMMDDHHmmss');
      await this.customersRepository.update(customerOld.id, customer);
    }else{
      response.message = 'Current password is incorrect';
      response.code = -1;
    }
   
    return response;
  }

  async updatePassword(customer: CustomerChangePwdDto): Promise<BaseResponseDto> {
    const response = new BaseResponseDto('Update password success', 1);
    const customerOld = await this.customersRepository.findOneBy({ phoneNumber: customer.phoneNumber });
    if(customerOld) {
      const isMatch = await bcrypt.compare(customer.currentPassword, customerOld?.password);
      if(isMatch || !customer.currentPassword) {
        const hashPassword = await bcrypt.hash(customer.newPassword, this.SALT_OR_ROUNDS);
        customerOld.password = hashPassword;     
        customerOld.updatedAt = moment().format('YYYYMMDDHHmmss'); 
        await this.customersRepository.update(customerOld.id, customerOld);
      }else{
        response.message = 'Current password is incorrect';
        response.code = -1;
      }
    }else{
      response.message = 'Phone number not found';
      response.code = -1;
    }
   
    return response;
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}