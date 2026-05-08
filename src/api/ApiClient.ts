import { APIRequestContext, request as playwrightRequest, APIResponse } from '@playwright/test';
import { env } from '../config/env';

export class ApiClient {
  private token?: string;
  private context?: APIRequestContext;

  async ready(): Promise<APIRequestContext> {
    if (this.context) return this.context;
    this.context = await playwrightRequest.newContext({
      baseURL: env.apiBaseUrl,
      extraHTTPHeaders: this.buildHeaders(),
    });
    return this.context;
  }

  async dispose() {
    await this.context?.dispose();
    this.context = undefined;
  }

  async login(email: string, password: string): Promise<string> {
    const ctx = await this.ready();
    const response = await ctx.post('/users/login', { data: { email, password } });
    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()} ${await response.text()}`);
    }
    const body = (await response.json()) as { access_token: string };
    this.token = body.access_token;
    await this.context?.dispose();
    this.context = undefined;
    return this.token;
  }

  async get(path: string, params?: Record<string, string | number>): Promise<APIResponse> {
    const ctx = await this.ready();
    return ctx.get(path, { params });
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    return headers;
  }
}
