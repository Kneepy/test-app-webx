import { ICustomHeaders } from "../../types/custom-headers.type"

export interface AuthUserDTO {
    Body: {
        email: string
        password: string
    },
    Headers: ICustomHeaders
}