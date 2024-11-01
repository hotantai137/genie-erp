import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService
  ) {}

    async signIn(phoneNumber: string, password: string): Promise<{ access_token: string, phoneNumber: string }> {
        const customer = await this.customersService.findOnePhoneNumber(phoneNumber);
        const isMatch = await bcrypt.compare(password, customer?.password);
        if (!customer || !isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: customer.id, phoneNumber: customer.phoneNumber };
        return {
            access_token: await this.jwtService.signAsync(payload),
            phoneNumber: customer.phoneNumber
        };        
    }
}