# Inventory Management System

Система управления приходами и продуктами с графиками, PWA и Docker.

## Функционал

- ✅ Управление приходами (просмотр, удаление с подтверждением)
- ✅ Управление продуктами с фильтрацией по типу
- ✅ Реальное время (часы + счётчик активных сессий через WebSocket mock)
- ✅ Детальный просмотр прихода с продуктами
- ✅ График сумм приходов (Chart.js)
- ✅ PWA (установка на устройство, офлайн-режим)
- ✅ Docker-контейнеризация

## 📋 Требования к тестовому (выполнены)

- ✅ React.js (последняя версия)
- ✅ Redux Toolkit
- ✅ CSS Architecture (БЭМ)
- ✅ Bootstrap
- ✅ GraphQL + REST
- ✅ WebSocket (Socket.io)
- ✅ TypeScript
- ✅ JWT авторизация
- ✅ Docker + Docker Compose
- ✅ PWA (установка на устройство)
- ✅ Unit + интеграционные тесты
- ✅ Web Workers для фильтрации
- ✅ i18n (русский/английский)

## Быстрый старт

### Локальный запуск

# Установка зависимостей

npm install
cd server && npm install

# Запуск сервера и клиента одновременно

npm run dev:full

# Либо по отдельности:

npm start # React (порт 3000)

cd server && npm run dev # Node.js (порт 3001)

Приложение откроется на http://localhost:3000

Сборка production

npm run build
npx serve -s build



# Сборка образа

docker build -t inventory-app .

# Запуск контейнера

docker run -d -p 8080:80 --name inventory inventory-app

Открыть http://localhost:8080

PWA

После сборки (npm run build) приложение можно установить:

На Chrome: нажать на иконку "Установить" в адресной строке

Или нажать на кнопку "Установить приложение" в правом нижнем углу

## 🚀 Быстрый старт

### Способ 1: Docker Compose (рекомендуется)

# Клонировать репозиторий

git clone https://github.com/freeman1306/inventory-app.git

cd inventory-app

# Запустить всё одной командой

docker-compose up -d --build

# Приложение доступно:

# - Frontend: http://localhost

📊 Функционал

Основной :

Просмотр списка приходов с суммой в двух валютах

Детальный просмотр прихода с продуктами (панель справа)

Удаление прихода с подтверждением (попап)

Фильтрация продуктов по типу

Поиск по названию/SN (через Web Worker)

Реальное время
Часы с обновлением каждую секунду

Счётчик активных сессий через WebSocket

Синхронизация между вкладками/браузерами

Графики и аналитика
График сумм приходов по датам (Chart.js)

Две оси Y (USD и UAH)

PWA
Установка на устройство

Офлайн-режим

Service Worker кеширование

Безопасность
JWT авторизация

Защищённые маршруты

Токен в localStorage

🗄️ База данных
Файл схемы: database/schema.sql

Открыть в MySQL Workbench для просмотра структуры:
mysql -u root -p inventory_db < database/schema.sql

