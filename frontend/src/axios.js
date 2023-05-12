import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs"

const api = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
        Authorization: sessionStorage.getItem("access_token"),
        fingerprint: (await (await FingerprintJS.load()).get()).visitorId
    }
})

export default api