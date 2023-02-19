import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getToken')
  getToken() {
    return this.appService.getToken();
  }

  @Post('createDeal')
  createDeal() {
    return this.appService.createDeal();
  }

  @Post('createContact')
  createContact() {
    return this.appService.createContact();
  }

  @Post('createCompany')
  createCompany() {
    return this.appService.createCompany();
  }
}
