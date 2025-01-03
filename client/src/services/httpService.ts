import { config } from '@/config';
import { AuthorizationError } from '../errors/AuthorizationError';
import { BadRequestError } from '../errors/BadRequestError';
import { HTTPError } from '../errors/HTTPError';
import { FieldError } from '../errors/FieldError';
import { NotFoundError } from '../errors/NotFoundError';
import { ServerError } from '../errors/ServerError';
// import { authService } from './authService';
// import { userInfoService } from './UserInfoService';
import { NotUniqueError } from '../errors/NotUniqueError';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface RequestOptions {
  query?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, any>;
}

type GetRequestOptions = Omit<RequestOptions, 'body'>;

class HttpService {
  get<T>(url: string, options?: GetRequestOptions) {
    return this.request<T>(url, 'GET', options);
  }

  post<T>(url: string, options: RequestOptions) {
    return this.request<T>(url, 'POST', options);
  }

  put<T>(url: string, options: RequestOptions) {
    return this.request<T>(url, 'PUT', options);
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>(url, 'DELETE', options);
  }

  private async request<T>(
    path: string,
    method: Method,
    { body, headers, query }: RequestOptions = {},
  ) {
    const baseUrl = config.baseUrl.replace(/\/$/, '');
    const requestPath = path.replace(/^\//, '');
    const queryString = new URLSearchParams(query).toString();

    const requestUrl = `${baseUrl}/${requestPath}?${queryString}`;

    // const token = userInfoService.authToken;

    let response: Response;
    try {
      response = await fetch(requestUrl, {
        method,
        headers: {
          // ...(token ? { Authorization: token } : {}),
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } catch (error) {
      throw new HTTPError();
    }

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();

        if ('fieldErrors' in data && 'formErrors' in data) {
          throw new FieldError(data.fieldErrors, data.formErrors);
        }

        if ('message' in data && data.message === 'Email must be unique') {
          throw new NotUniqueError();
        }

        throw new BadRequestError();
      }
      if (response.status === 401) {
        // authService.logout();
        throw new AuthorizationError();
      }
      if (response.status === 404) {
        throw new NotFoundError();
      }

      throw new ServerError();
    }

    const result = (await response.json()) as T;
    return { result, headers: response.headers };
  }
}

export const httpService = new HttpService();
