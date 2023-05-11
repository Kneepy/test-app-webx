import * as jwt from "jsonwebtoken"
import { JWT_ACCESS_EXPIRESIN, JWT_ACCESS_SECRET, SESSION_EXPIRESIN } from "src/constants/jwt"
import { AccessTokenPayload } from "./interfaces/access-token-payload.interface"
import { Tokens } from "./interfaces/tokens.interface"
import { NOT_FOUND_SESSION } from "src/constants/errors"
import { SessionModel } from "src/models/session.model"
import { SessionOptions } from "./interfaces/session-options.interface"

class TokensService {
    async generateTokens(payload: AccessTokenPayload, fingerprint: string): Promise<Tokens> {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: JWT_ACCESS_EXPIRESIN
        })    
        const refreshToken = await SessionModel.create({user: payload.user_id, fingerprint, createdAt: Date.now()})

        /**
         * Если этот метод будет вызываться вне блока регистрации то могут быть пользователи с
         * одинаковыми fingerprint а у пользователя не может быть больше одной сессии с одним fingrerprint
         */
        await SessionModel.deleteOne({ user: payload.user_id, fingerprint })

        return {
            accessToken,
            refreshToken: refreshToken._id.toString()
        }
    }
    async verifyTokens(tokens: Tokens): Promise<AccessTokenPayload> {
        const verifyAccessToken = jwt.verify(tokens.accessToken, JWT_ACCESS_SECRET) as AccessTokenPayload
        const session = await SessionModel.findOne({ _id: tokens.refreshToken })

        if(verifyAccessToken.user_id && Number(session.createdAt) + SESSION_EXPIRESIN > Date.now() && session.user._id.toString() === verifyAccessToken.user_id) {
            return {
                user_id: verifyAccessToken.user_id,
            }
        }

        return {
            user_id: null
        }
    }

    /**
     * Метод проверяет токены и если они ещё действительны то возвращает их, иначе создаёт пару новых токенов
     * @param tokens текущие токены пользователя
     * @param sessionOptions опции для создания сессии
     * @returns пару старых или обнавлённых токенов
     */
    async checkSession(tokens: Tokens, sessionOptions: SessionOptions): Promise<Tokens> {
        const verifedTokens = await this.verifyTokens(tokens)

        if(verifedTokens.user_id) return tokens

        const oldRefreshToken = await SessionModel.findOne({ _id: tokens.refreshToken, fingerprint: sessionOptions.fingerprint })
        await SessionModel.deleteOne({ _id: oldRefreshToken._id })

        // соответсвенно если не нашли сессию то пользователь не авторизован
        if(!oldRefreshToken?.fingerprint) {
            throw new Error(NOT_FOUND_SESSION)
        }

        return await this.generateTokens({ user_id: oldRefreshToken.user._id.toString() }, sessionOptions.fingerprint)
    }
}

export default new TokensService()