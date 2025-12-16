# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json из папки frontend
COPY frontend/package.json /app/package.json
COPY frontend/package-lock.json /app/package-lock.json

# Устанавливаем зависимости
RUN npm ci

# Копируем все остальные файлы из папки frontend
COPY frontend /app/

# Запуск приложения
CMD ["npx", "-y", "http-server", "-p", "8000", "/app/build"]
