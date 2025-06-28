# Finance Telegram Bot & Mini App

Финансовое приложение с Telegram ботом и Telegram Mini App для управления личными финансами.

## Архитектура проекта

Проект построен на модульной архитектуре NestJS с четким разделением ответственности:

```
src/
├── core/                          # Базовые модули
│   ├── config/                    # Конфигурация приложения
│   ├── database/                  # Интеграция с Prisma и БД
│   ├── logger/                    # Кастомный логгер
│   └── auth/                      # Авторизация
│
├── common/                        # Общие компоненты
│   ├── decorators/                # Кастомные декораторы
│   ├── filters/                   # Exception filters
│   ├── pipes/                     # Validation pipes
│   └── types/                     # Общие типы
│
├── modules/                       # Бизнес-логика (общая для всех интерфейсов)
│   ├── users/                     # Управление пользователями
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │
│   ├── finance/                   # Финансовый модуль
│   │   ├── finance.module.ts      # Объединяющий модуль
│   │   ├── finance.service.ts     # Координирующий сервис
│   │   ├── transactions/          # Транзакции
│   │   ├── categories/            # Категории расходов/доходов
│   │   ├── currencies/            # Валюты
│   │   ├── budgets/               # Бюджеты
│   │   └── reports/               # Отчеты и аналитика
│   │
│   └── notifications/             # Уведомления
│
├── interfaces/                    # Интерфейсы взаимодействия
│   ├── telegram/                  # Telegram интерфейс
│   │   ├── bot/                   # Telegram Bot
│   │   │   ├── scenes/            # Сцены бота
│   │   │   └── handlers/          # Обработчики команд
│   │   └── webhooks/              # Webhook для Mini App
│   │
│   └── api/                       # REST API
│       └── v1/                    # Версионирование API
│
├── app.module.ts                  # Главный модуль приложения
└── main.ts                        # Точка входа
```

## Технологический стек

- **NestJS 11.0.1** - основной фреймворк
- **Prisma 6.10.1** - ORM для работы с базой данных
- **PostgreSQL** - СУБД
- **nestjs-telegraf 2.9.1** - интеграция с Telegram Bot API
- **Swagger** - документация API
- **TypeScript** - язык программирования
- **Docker** - контейнеризация

## Начало работы

### Предварительные требования

- Node.js 18+
- Docker и Docker Compose
- Telegram Bot Token (получить у [@BotFather](https://t.me/BotFather))

### Установка

1. Клонировать репозиторий:

```bash
git clone <repository-url>
cd nest_bot
```

2. Установить зависимости:

```bash
npm install
```

3. Настроить переменные окружения:

```bash
cp .env.example .env
# Отредактировать .env файл, добавив TELEGRAM_BOT_TOKEN
```

4. Запустить PostgreSQL:

```bash
npm run postgres:up
```

5. Применить миграции:

```bash
npx prisma migrate deploy
```

6. Запустить приложение:

```bash
npm run start:dev
```

## Разработка

### Структура модулей

Каждый модуль содержит:

- `*.module.ts` - определение модуля
- `*.service.ts` - бизнес-логика
- `*.controller.ts` - REST API (если применимо)
- `dto/` - объекты передачи данных
- `entities/` - сущности

### Telegram Bot

Бот использует библиотеку nestjs-telegraf и поддерживает:

- Команды
- Сцены для сложных взаимодействий
- Inline клавиатуры

Пример команды:

```typescript
@Command('add_expense')
async addExpenseCommand(@Ctx() ctx: Context) {
  await ctx.reply('Введите сумму расхода:');
  ctx.scene.enter('add-expense');
}
```

### REST API

API документирован с помощью Swagger и доступен по адресу `/docs`.

Основные эндпоинты:

- `/api/v1/transactions` - управление транзакциями
- `/api/v1/categories` - управление категориями
- `/api/v1/reports` - получение отчетов

## База данных

### Схема

```prisma
model user {
  id String @id @default(uuid())
  telegram_id BigInt @unique
  first_name String
  last_name String?
  email String?
  is_registered Boolean @default(false)
  registration_date DateTime?
  last_activity DateTime?
  currencies currency[]
  categories category[]
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
}

model currency {
  id String @id @default(uuid())
  name String
  symbol String
  users user[]
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
}

model category {
  id String @id @default(uuid())
  name String @unique
  users user[]
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
}
```

## Тестирование

```bash
# unit тесты
npm run test

# e2e тесты
npm run test:e2e

# test coverage
npm run test:cov
```

## Деплой

### Docker

```bash
# Сборка образа
docker build -t finance-bot .

# Запуск контейнера
docker run -p 3000:3000 --env-file .env finance-bot
```

### Без Docker

```bash
npm run build
npm run start:prod
```

## Принципы разработки

1. **DRY (Don't Repeat Yourself)** - общая бизнес-логика для всех интерфейсов
2. **SOLID** - особенно принцип единственной ответственности
3. **Domain-Driven Design** - модули организованы по бизнес-доменам
4. **Чистая архитектура** - независимость бизнес-логики от фреймворков

## Лицензия

[MIT](LICENSE)
