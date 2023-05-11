import * as jwt from "jsonwebtoken"
import { JWT_ACCESS_EXPIRESIN, JWT_ACCESS_SECRET } from "src/constants/jwt"
import { SessionModel } from "src/models/session.model"
import { AccessTokenPayload } from "./interfaces/access-token-payload.interface"
import { Tokens } from "./interfaces/tokens.interface"

class TokensService {
    async generateTokens(payload: AccessTokenPayload): Promise<Tokens> {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: JWT_ACCESS_EXPIRESIN
        })    
        const refreshToken = await SessionModel.create({user: payload.user_id, fingerprint: payload.fingerprint, createdAt: Date.now()})

        return {
            accessToken,
            refreshToken: refreshToken._id.toString()
        }
    }
    async verifyTokens(tokens: Tokens): Promise<AccessTokenPayload> {
        try {
            const verifyAccessToken = jwt.verify(tokens.accessToken, JWT_ACCESS_SECRET) as AccessTokenPayload

            return {
                user_id: verifyAccessToken.user_id,
                fingerprint: verifyAccessToken.fingerprint
            }
        } catch (e) {
            /**
             * Если токен не действиетелен то выкидывает ошибку
             */
 

        }
        

        return 
    }
}

export default new TokensService()