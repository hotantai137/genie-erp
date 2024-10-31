import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { PageDto } from 'src/common/page.dto';
import { Public } from 'src/auth/auth.decorator';
import { PageOptionsDto } from 'src/common/pageOptions.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/document/apiPaginatedRes.decorator';
import { CustomerDto } from './dtos/customerCreate.dto';
import { ResponseInterceptor } from 'src/common/response.interceptor';

@Controller('customer')
@ApiTags('customer')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Customer)
  getAll(@Query() pageOptionsDto: PageOptionsDto,): Promise<PageDto<Customer>> {
    return this.customersService.findAll(pageOptionsDto);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  post(@Body() customer: CustomerDto): Promise<Customer> {
    return this.customersService.create(customer);
  }

  @Public()
  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() customer: CustomerDto): Promise<Customer> {
    return this.customersService.update(customer);
  }
}
