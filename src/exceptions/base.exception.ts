import { UNAUTORIZED } from "src/constants"

export class BaseException extends Error {
    status: number
    errors: string[]

    constructor(msg: string, status: number, errors: string[] = []) {
        super(msg)
        this.status = status
        this.errors = errors
    }

    static UnautorizedError(msg: string = UNAUTORIZED) {
        return new BaseException(msg, 401)
    }

    static BadRequest(msg: string) {
        return new BaseException(msg, 400)
    }
}