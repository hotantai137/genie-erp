import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomersService } from 'src/customers/customers.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
          CustomersModule
    ],
    providers: [AuthService
                , CustomersService
                , {
                    provide: APP_GUARD,
                    useClass: AuthGuard,
                  }
    ],
    controllers: [AuthController],
})
export class AuthModule {}
