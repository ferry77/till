import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantsModule } from './merchants/merchants.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [MerchantsModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
