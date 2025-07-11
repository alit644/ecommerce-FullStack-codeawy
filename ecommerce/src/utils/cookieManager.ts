import Cookies from "universal-cookie";
class CookieManager {
  private cookie: Cookies;

  constructor() {
    this.cookie = new Cookies();
  }

  //* Cookies  *//
  get(key: string): string | undefined {
    try {
      return this.cookie.get(key);
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
    return !!this.get("jwtToken");
  }
}

export default new CookieManager();
