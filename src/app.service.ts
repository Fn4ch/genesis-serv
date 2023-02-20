import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpService } from '@nestjs/axios/dist';
import { IGetTokenResp } from './models';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getToken(): Promise<IGetTokenResp> {
    try {
      const token = await axios.get<IGetTokenResp>(
        'https://test.gnzs.ru/oauth/get-token.php',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': '30878566',
          },
        },
      );
      return token.data;
    } catch (e) {
      return e;
    }
  }

  async createDeal(): Promise<any> {
    const { base_domain, access_token } = await this.getToken();
    try {
      const body: [object] = [
        {
          name: 'deal 3000',
        },
      ];
      const { data } = await firstValueFrom(
        this.httpService.post(`https://${base_domain}/api/v4/leads`, body, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      return data['_embedded']['leads'];
    } catch (e) {
      return e.message;
    }
  }

  async createContact() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const body: [object] = [
        {
          name: 'contact 3000',
        },
      ];
      const { data } = await firstValueFrom(
        this.httpService.post(`https://${base_domain}/api/v4/contacts`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }),
      );
      return data['_embedded']['contacts'];
    } catch (e) {
      return e.message;
    }
  }

  async createCompany() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const body: [object] = [
        {
          name: 'company 3000',
        },
      ];
      const { data } = await firstValueFrom(
        this.httpService.post(`https://${base_domain}/api/v4/companies`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }),
      );
      return data['_embedded']['companies'];
    } catch (e) {
      return e.message;
    }
  }
}
