import FormData from 'form-data';
import fs from 'fs';
import { Axios, AxiosResponse } from "axios";

export default class ApiService {
  constructor(readonly axios: Axios) {
  }

  async postRequest(url: string, body = {}): Promise<any> {
    try {
      const {data} = await this.axios.post(url, body);
      return data;
    } catch (error: any) {
      console.error(error.response);
      return error.response;
    }
  }

  async sendFile(url: string, name: string, filePath: string, fileName: string): Promise<any> {
    let formData = new FormData();
    formData.append(name, fs.readFileSync(filePath), fileName);

    try {
      const {data} = await this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...formData.getHeaders(),
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        },
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }

  async getRequest(
    url: string,
  ): Promise<any> {

    try {
      const {data} = await this.axios.get(url);
      console.trace(data)
      return data;
    } catch (error: any) {
      console.error(error.response);
      return error.response;
    }
  }

  async putRequest(url: string, body = {}): Promise<any> {
    try {
      const {data} = await this.axios.put(url, body);
      console.trace(data)
      return data;
    } catch (error: any) {
      console.error(error.response);
      return error.response;
    }
  }

  async deleteRequest(url: string, body = {}): Promise<any> {
    try {
      const {data} = await this.axios.delete(url, body);
      console.trace(data)
      return data;
    } catch (error: any) {
      console.error(error.response);
      return error.response;
    }
  }

  async setAuthToken(token: string): Promise<void> {
    if (token) {
      this.axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common.authorization;
    }
  }

  setSessionToken(token: string) {
    if (token) {
      this.axios.defaults.headers.common.session_id = `${token}`
    } else {
      delete this.axios.defaults.headers.common.session_id
    }
  }

  public getAxiosInstance = () => this.axios;
}
