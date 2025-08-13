import Cookies from "universal-cookie";
import type { IUserInfo } from "../interfaces";
class CookieManager {
  private cookie: Cookies;

  constructor() {
    this.cookie = new Cookies();
  }

  //* Cookies  *//
  get<T = string | IUserInfo>(key: string): T | IUserInfo | undefined {
    try {
      const value = this.cookie.get(key) as T | IUserInfo;
      if(!value) return undefined;
      return value;
    } catch (error) {
      console.log("Error retrieving cookie", error);
      return undefined;
    }
  }

  set(key: string, value: string, options: object = {}): void {
    try {
      const defaultOptions: object = {
        path: "/",
        secure: true,
        sameSite: "strict",
        ...options,
      };
      this.cookie.set(key, value, defaultOptions);
    } catch (error) {
      console.log("Error setting cookie", error);
    }
  }

  remove(key: string): void {
    try {
      this.cookie.remove(key, { path: "/" });
    } catch (error) {
      console.log("Error deleting cookie", error);
    }
  }

  isAuthenticated(): boolean {
    return !!this.get("jwt");
  }
}

export default new CookieManager();
