<script setup>
import { ref } from "vue"
import cookie from "js-cookie";
import { useRouter } from "vue-router"
import api from "../axios"

const email = ref("")
const password = ref("")
const router = useRouter()

const auth = async () => {
    const userTokens = await api.put("/user/login", { email: email.value, password: password.value })

    sessionStorage.setItem("access_token", userTokens.data.accessToken)
    cookie.set("refresh_token", userTokens.data.refreshToken, {expires: 14})
    
    router.push({path: "/posts"})
}
</script>
<template>
    <div>
        <router-link :to="{path: `/posts`}">All posts</router-link><br/>
        <router-link :to="{path: `/`}">Registration</router-link>
        
        <h1>Login</h1>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button @click="auth">Login</button>
    </div>
</template>
