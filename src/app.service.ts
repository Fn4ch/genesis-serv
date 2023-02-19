import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IGetTokenResp } from './models';

@Injectable()
export class AppService {
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

  async createDeal() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const deal = await axios.post(`https:${base_domain}/api/v4/leads`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      return deal;
    } catch (e) {
      return e;
    }
  }

  async createContact() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const contact = await axios.post(`https:${base_domain}/api/v4/contacts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      return contact;
    } catch (e) {
      return e;
    }
  }

  async createCompany() {
    const { base_domain, access_token } = await this.getToken();
    try {
      const company = await axios.post(
        `https:${base_domain}/api/v4/companiess`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return company;
    } catch (e) {
      return e;
    }
  }
}
