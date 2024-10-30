import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffsModule } from './staffs/staffs.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoriesModule } from './inventories/inventories.module';
import { PurchasesModule } from './purchases/purchases.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    })
    // , TypeOrmModule.forRoot(),
    // , StaffsModule
    // , CustomersModule
    // , ProductsModule
    , CompaniesModule
    // , WarehousesModule
    // , InventoriesModule
    // , PurchasesModule
    // , OrdersModule
    // , AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'cats', method: RequestMethod.GET });
//   }
//   constructor(private dataSource: DataSource) {}
// }
