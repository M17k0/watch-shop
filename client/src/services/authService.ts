import { AuthorizationError } from '../errors/AuthorizationError';
import { InvalidInputError } from '../errors/InvalidInputError';
import { httpService } from './httpService';
import { userInfoService } from './UserInfoService';

interface loginAttributes {
  email: string;
  password: string;
}

interface registerAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

class AuthService {
  async login({ email, password }: loginAttributes) {
    const { result } = await httpService.post<{ message: string; token: string }>('/users/login', {
      body: {
        email,
        password,
      },
    });
  
    const token = result.token;
  
    if (!token) {
      throw new AuthorizationError('Token missing in response');
    }
  
    userInfoService.save(token);
  }

  async register({ firstName, lastName, email, password, confirmPassword, phoneNumber }: registerAttributes) {
    if (password !== confirmPassword) {
      throw new InvalidInputError();
    }

    const { result } = await httpService.post<{ message: string, token: string }>('users/register', {
      body: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      },
    });

    const token = result.token;

    if (!token) {
      throw new AuthorizationError();
    }

    userInfoService.save(token);
  }

  logout() {
    userInfoService.clear();
  }
}

export const authService = new AuthService();
