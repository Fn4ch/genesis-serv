import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpService } from '@nestjs/axios/dist';
import { IGetTokenResp } from './models';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getToken(): Promise<IGetTokenResp> {
    const token = await axios.get<IGetTokenResp>(
      'https://test.gnzs.ru/oauth/get-token.php',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Client-Id': '30878566',
        },
      },
    );
    return token.data;
  }

  async createDeal(): Promise<any> {
    const { base_domain, access_token } = await this.getToken();
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(`https:${base_domain}/api/v4/leads`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }),
      );
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async createContact() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(`https:${base_domain}/api/v4/contacts`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }),
      );
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async createCompany() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(`https:${base_domain}/api/v4/companiess`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }),
      );
      return data;
    } catch (e) {
      console.log('error:' + e);
      return e;
    }
  }
}
