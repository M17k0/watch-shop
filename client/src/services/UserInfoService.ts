import { jwtDecode } from "jwt-decode";
import { LocalStorageService } from "./localStorageService";

export interface User {
  email: string;
  userId: number;
}

type AuthHandler = (user: User | undefined) => void;

export class UserInfoService {
  private storage: LocalStorageService<string>;
  private handler: AuthHandler | null = null;

  constructor() {
    this.storage = new LocalStorageService('watches-user');
  }

  setHandler(handler: AuthHandler | null) {
    this.handler = handler;
  }

  save(token: string) {
    const user = this.getUserFromToken(token);

    this.handler?.(user);
  
    this.storage.set(token);
  }

  clear() {
    this.handler?.(undefined);
    this.storage.clear();
  }

  get initialUser() {
    const token = this.storage.get();

    if (!token) {
      return undefined;
    }

    return this.getUserFromToken(token);
  }

  private getUserFromToken(token: string): User {
    const decoded = jwtDecode(token) as { email: string, userId: number };
    return { email: decoded.email, userId: decoded.userId };
  }

  get authToken() {
    return this.storage.get();
  }
}

export const userInfoService = new UserInfoService();
