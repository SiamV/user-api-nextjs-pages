# testTaskUsers
выполнение тестового задания

## Task Description:
Требуется разработать API сервис для хранения пользователей
- Сервис должен быть организован по принципу REST API
- Пароли хэшировать на стороне сервера при создании пользователя
- Заложить структуру проекта (директории routes, services, etc.)
- Эндпоинты хранить в суб-роутерах
- Миграции (alembic)
- Использовать pipenv
- Сервис должен иметь CRUD-функции для работы с пользователями
- CRUD-функции делать классом и вообще использовать ООП
- Для запросов к сервису и ответов использовать JSON
- Система должна быть отзывчива и производительна
- Сервис должен хранить информацию о пользователях в БД (SQLite не использовать!) и выполнять запросы при помощи ORM(использовать такие поля для хранения пользователей: id, username, email. password, register_date).
- Покрыть код тестами (pytest)
- Использовать асинхронность (async/await)
Technical requirements
Требуется разработать следующие api эндпоинты:
- POST /user
- GET /user/<user-id>
- PUT /user/<user-id>
- PATCH /user/<user-id>
- DELETE /user/<user-id>
- GET /user-list
- Сервис требуется реализовать при помощи fastapi и любой поддерживаемой им ORM (sql, nosql база даннх на выбор, кроме SQLite)
- Весь стек должен запускаться через docker-compose

# Решение
## Архитектура проекта
Приложение полностью работает на базе Next.Js.
В отличие от чистого React.js, который работает в браузере клиента (CSR),
Next.js рендерит разметку на стороне сервера (SSR).
Это позволяет сделать CEO оптимизацию и подружить APP с поисковыми роботами.

Подключение базы данных MongoDB:
-папки lib/dbConnect.js, models/UserDB.js

Создание REST API:
-папки pages/api/users
endPoints доступны по следующим запросам:
- GET /api/users (получение всех пользователей)
- GET /api/users/<user-id> (получение одного пользователя по id)
- POST /api/users (создание нового пользователя)
- PUT /api/users/<user-id> (редактирование существующего пользователя по id)
- DELETE /api/users/<user-id> (удаление пользователя по id)

Маршрутизация:
-папка pages/undex.js, pages/users.js, pages/users/[id].js ...

Вспомогательные файлы и клиентские компоненты:
- components, common

Проект работает на локалке
npm run dev
билдится
npm run build

### Deploy on Vercel
Ссылка на проект
https://user-api-nextjs-pages.vercel.app/

Но не работает на хостинге. Загружаются только страницы не требующие получения данных из DBMongo, например,
https://user-api-nextjs-pages.vercel.app/
https://user-api-nextjs-pages.vercel.app/users/userform

Возможно проблема в url при prodaction и следствие не подключается к BD Mongo
При непосредстенном запросе к GET, например,
https://user-api-nextjs-pages.vercel.app/api/users
выдает ошибку 504: GATEWAY_TIMEOUT
