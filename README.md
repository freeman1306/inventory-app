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

## Стек

- React 18
- Redux Toolkit
- React Router v6
- Bootstrap 5
- Chart.js
- Socket.io-client (mock)
- Docker + Nginx

## Быстрый старт

### Локальный запуск

```bash
npm install
npm start

Приложение откроется на http://localhost:3000

Сборка production

npm run build
npx serve -s build

Запуск в Docker

# Сборка образа
docker build -t inventory-app .

# Запуск контейнера
docker run -d -p 8080:80 --name inventory inventory-app
Открыть http://localhost:8080

PWA
После сборки (npm run build) приложение можно установить:

На Chrome: нажать на иконку "Установить" в адресной строке

Или нажать на кнопку "Установить приложение" в правом нижнем углу

Тестирование
Unit-тесты: npm test

Production-сборка проверяется в Docker
```
