import { FastifyReply, FastifyRequest } from "fastify";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS, UNAUTORIZED } from "src/constants";
import { AuthUserDTO } from "src/dtos/user-dtos/auth-user.dto";
import { GetMeBySession } from "src/dtos/user-dtos/get-me-by-session.dto";
import TokensService from "src/services/tokens.service";
import UserService from "src/services/user.service";

class UserController {

    /**
     * Осуществляет создание аккаунта пользователя используя почту и пароль
     * Возвращает набор токенов авторизации
     * В случае если пользователь с такой почтой уже существует выдаёт ошибку
     */
    async registration({ body, headers }: FastifyRequest<AuthUserDTO>, reply: FastifyReply) {
        try {
            const { email, password } = body
            const { fingerprint } = headers

            const user = await UserService.registration({ email, password })
            const tokens = await TokensService.generateTokens({ user_id: user._id.toString() }, fingerprint)

            reply.headers({
                authorization: tokens.accessToken
            })
            .setCookie(SESSION_COOKIE_NAME, tokens.refreshToken, SESSION_COOKIE_OPTIONS)
            .status(201)

            return tokens
        } catch (e: Error | any) { 
            reply.status(401).send(e)
        }
    }
    
    /**
     * Осуществляет вход пользователя по почте и паролю
     * Возвращает два токена авторизации
     */
    async login({ body, headers }: FastifyRequest<AuthUserDTO>, reply: FastifyReply) {
        try {
            const { email, password } = body
            const { fingerprint } = headers

            const user = await UserService.login({ email, password })
            const tokens = await TokensService.generateTokens({ user_id: user._id.toString() }, fingerprint)

            reply.headers({
                authorization: tokens.accessToken
            })
            .setCookie(SESSION_COOKIE_NAME, tokens.refreshToken, SESSION_COOKIE_OPTIONS)
            .status(201)
            
            return tokens
        } catch (e) { 
            reply.status(401).send(e)
        }
    }

    /**
     * Проверяет токены авторизации на валидность и добавляет в запрос поле user_id содержащее id пользователя из токенов авторизации 
     * В случае невалидности токенов выбрасывает ошибку
     */
    async auth({ headers, cookies, ...req }: FastifyRequest<GetMeBySession>, reply: FastifyReply) {
        try {
            const { refresh_token } = cookies
            const { authorization, fingerprint } = headers

            const tokens = await TokensService.checkSession({accessToken: authorization, refreshToken: refresh_token}, {fingerprint})
            const verifedTokens = await TokensService.verifyTokens(tokens)

            if(!verifedTokens.user_id) throw new Error(UNAUTORIZED)

            req.user_id = verifedTokens.user_id
        } catch (e) {
            reply.status(401).send(e)
        }
    }
}

export default new UserController()