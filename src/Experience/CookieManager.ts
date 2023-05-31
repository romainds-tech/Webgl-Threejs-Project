import {User} from "./utils/Types";

export default class CookieManager {

    private static instance: CookieManager;

    private constructor() {
    }

    setCookie(user: User) {
        // set user cookie in User type json
        document.cookie = JSON.stringify(user);
    }

    getCookie(name: string): User  {
        let cookie = document.cookie

        if (cookie) {
            return JSON.parse(cookie);
        }
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