# образ
FROM node:alpine

# рабочия директория
WORKDIR /user-api-nextjs-pages

# копируем указанные файлы в рабочую директорию
COPY package.json package-lock.json ./
# устанавливаем зависимости
RUN npm install

# копируем остальные файлы
COPY . .

# выполняем сборку приложения
RUN npm run build

EXPOSE 3000

# запускаем кастомный сервер в производственном режиме
CMD ["npm", "run", "start"]
