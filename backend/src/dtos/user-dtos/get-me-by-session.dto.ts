import { ICustomCookies } from "src/types/custom-cookies.type";
import { ICustomHeaders } from "src/types/custom-headers.type";

export interface GetMeBySession {
    Headers: ICustomHeaders,
    Cookies: ICustomCookies
}