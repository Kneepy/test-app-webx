import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from "vue-router"
import cookie from "js-cookie"
 
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: "/me-posts",
            component: () => import("./components/MePosts.vue"),
        },
        {
            path: "/",
            component: () => import("./components/Reg.vue"),
        },
        {
            path: "/login",
            component: () => import("./components/Auth.vue")
        }
    ],
})

const app = createApp(App)

router.beforeEach((to, from, next) => {
    if(to.path === "/me-posts" && !cookie.get("refresh_token")) next({path: "/"})
    if(to.path === "/" && cookie.get("refresh_token")) next({path: "/me-posts"})
    next()
})
app.use(router)

app.mount('#app')

