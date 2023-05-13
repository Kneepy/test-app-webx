import { SESSION_EXPIRESIN } from "./jwt"

export const SESSION_COOKIE_OPTIONS = {httpOnly: true, secure: true, maxAge: SESSION_EXPIRESIN, path: "/", sameSite: "none"}
export const SESSION_COOKIE_NAME = "refresh_token"

export const DEFAULT_TAKE_POSTS = 20