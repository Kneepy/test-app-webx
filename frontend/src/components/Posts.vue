<script setup>
import { ref, onMounted } from "vue"
import api from "../axios"
import { useRouter } from "vue-router";

const router = useRouter()

const title = ref("")
const media = ref("")

const posts = ref([]);

const getPosts = async (page) => {
    posts.value = (await api.get("/posts", {params: {take: 20*page, skip: 20*page - 20}})).data  
}
const create = async () => {
    const post = await api.post("/post", {title: title.value, media: media.value})

    posts.value.push(post.data)

    title.value = ""
    media.value = ""
}
const nextPage = async (i) => await getPosts(i)
onMounted(async () => await getPosts(1))
</script>
<template>
    <div class="posts">
        <router-link :to="{path: `/login`}">Login</router-link>
        <router-link :to="{path: `/`}">Registration</router-link>
        <h1>All Posts</h1>
        <div class="add_post_form">
            <input type="text" placeholder="title" v-model="title">
            <input type="text" placeholder="media" v-model="media">
            <button @click="create">Create Post</button>
        </div>
        <div v-for="post in posts" class="post">
            <div class="user">{{ post.user.email }}</div>
            <div class="content">
                <div class="title">{{ post.title }}</div>
                <div class="media">{{ post.media }}</div>
            </div>
            <button class="edit">Edit</button>
        </div>
        <div class="pagination">
            <button @click="() => nextPage(i)" v-for="i in 10">{{ i }}</button>
        </div>
    </div>
</template>
<style>
.posts {
    display: flex;
    flex-direction: column;
}
.post {
    display: flex;
    border: 1px solid;
    align-items: center;
    height: 50px;
}
.content {
    margin-left: 10px;
}
</style>