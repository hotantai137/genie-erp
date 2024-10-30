import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService
  ) {}

    async signIn(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.customersService.findOneUserName(username);
        console.log(user);
        console.log(password);
        if (user?.PASSWORD !== password) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.USERNAME };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };        
    }
}