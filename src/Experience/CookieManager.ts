import { User } from "./utils/Types";

export default class CookieManager {
  private static instance: CookieManager;

  private constructor() {}

  setCookie(user: User) {
    // set user cookie in User type json
    document.cookie = `user=${JSON.stringify(user)}`;
  }

  getCookie(name: string): User {
    let cookie: string = document.cookie || "";

    // get user cookie in User type json

    if (cookie && cookie.includes(name)) {
      cookie = cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))!
        .split("=")[1];
      return JSON.parse(cookie);
    }

    // console.log("USER", user);

    return {
      phoneNumber: "",
      zodiacSign: "",
      hourBirth: "",
    };
  }

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }
}
