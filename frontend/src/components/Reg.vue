<script setup>
import { ref } from "vue"
import cookie from "js-cookie";
import { useRouter } from "vue-router"
import api from "../axios"

const email = ref("")
const password = ref("")
const router = useRouter()

const register = async () => {
    const userTokens = await api.post("/user/registration", { email: email.value, password: password.value })

    sessionStorage.setItem("access_token", userTokens.data.accessToken)
    cookie.set("refresh_token", userTokens.data.refreshToken, {expires: 14})
    
    router.push({path: "/posts"})
}
</script>
<template>
    <div>
        <router-link :to="{path: `/login`}">Login</router-link><br/>
        <h1>Register</h1>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button @click="register">Register</button>
    </div>
</template>
