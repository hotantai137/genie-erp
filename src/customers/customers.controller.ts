import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { PageDto } from 'src/common/page.dto';
import { Public } from 'src/auth/auth.decorator';
import { PageOptionsDto } from 'src/common/pageOptions.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/document/apiPaginatedRes.decorator';
import { CustomerDto } from './dtos/customerCreate.dto';
import { CustomerChangePwdDto } from './dtos/customerChangePwd.dto';

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
  @Get(':phoneNumber')
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Customer)
  get(@Param('phoneNumber') phoneNumber: string): Promise<Customer> {
    return this.customersService.findOneByPhone(phoneNumber);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  post(@Body() customer: CustomerDto): Promise<Customer> {
    return this.customersService.create(customer);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() customer: CustomerDto, @Req() request: Request): Promise<any> {
    const user = request['user'];
    console.log(user);
    return this.customersService.update(customer);
  }

  @Public()
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  UpdatePassword(@Body() customer: CustomerChangePwdDto): Promise<any> {
    return this.customersService.updatePassword(customer);
  }
}
