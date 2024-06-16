import axios, { Axios } from "axios";
import {
  IDeleteOptions,
  IGetOptions,
  IPostOptions,
  IPutOptions,
} from "./api-client.interfaces";

export class ApiClientBase {
  private client: Axios | undefined;

  constructor(baseURL: string) {
    this.initializeClient(baseURL);
  }

  private initializeClient(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected async get<T>(options: IGetOptions): Promise<T> {
    const { url, params } = options;
    const response = await this.client?.get<T>(url, { params });
    if (!response) throw new Error("No response");

    return response?.data;
  }

  protected async post<T>(options: IPostOptions): Promise<T> {
    const { url, data } = options;
    const response = await this.client?.post<T>(url, data);
    if (!response) throw new Error("No response");

    return response?.data;
  }

  protected async put<T>(options: IPutOptions): Promise<T> {
    const { url, data } = options;
    const response = await this.client?.put<T>(url, data);
    if (!response) throw new Error("No response");

    return response?.data;
  }

  protected async delete<T>(options: IDeleteOptions): Promise<T> {
    const { url } = options;
    const response = await this.client?.delete<T>(url);
    if (!response) throw new Error("No response");

    return response?.data;
  }
}
