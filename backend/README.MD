```
/user/me
- GET
- Headers: <fingerprint>, <Authorization>
- Получает текущего авторизированого пользователя по jwt токену из заголовка Authorization 
```
```
/user/registration
- POST
- Headers: <fingerprint>
- Body: {
    email: string
    password: string
}
- Регистрирует пользователя по почте и паролю
```
```
/user/login
- PUT
- Headers: <fingerprint>
- Body: {
    email: string
    password: string
}
- Входит в аккаунт по паролю и почте
```
```
/post
- POST
- Headers: <fingerprint>, <Authorization>
- Body: {
    title: string
    media: string
}
- Создаёт пост
```
```
/post
- PATCH
- Headers: <fingerprint>, <Authorization>
- Body: {
    title?: string
    media?: string
}
- Обновляет запись 
```
```
/posts
- GET
- Query: {
    take: number
    skip: number
}
- Получет все посты количественном интервале от skip до take [skip, take]
```