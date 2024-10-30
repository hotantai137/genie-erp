import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity'

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customersRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async findOne(id: number): Promise<Customer | null> {
    return await this.customersRepository.findOneBy({ id });
  }

  async findOneUserName(userName: string): Promise<Customer | null> {
    return await this.customersRepository.findOne({ where: {USERNAME: userName}});
  }

  async create(data: any): Promise<Customer[]> {
    const customer = this.customersRepository.create(data);
    await this.customersRepository.save(customer);
    return customer;
  }

  async update(id: number, company: Customer) {
    const result = await this.customersRepository.update(id, company);
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}